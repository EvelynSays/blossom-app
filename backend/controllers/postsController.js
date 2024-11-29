import mongoose from "mongoose";
import Post from "../models/PostModel.js";
import User from "../models/userModel.js";

// Get all posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: "desc" });
        res.status(200).json({ posts });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Get all posts for a specific user
const getUserPosts = async (req, res) => {
    // Get authenticated user from the request object
    const user = await User.findById(req.user._id);

    try {
        const userPosts = await Post.find({ user: user._id }).sort({ createdAt: "desc" });
        res.status(200).json({ userPosts, email: user.email });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Create a new post
const addPost = async (req, res) => {

    // Grab data from request body
    const { title, body } = req.body;

    // Check that fields are not empty
    if (!title || !body) {
        return res.status(400).json({ error: 'All fields are required' });
    };

    // Get authenticated user from the request object
    const user = await User.findById(req.user._id);

    try {
        const post = await Post.create({ user: user._id, title, body });
        res.status(200).json({ success: "post created successfully.", post });
    } catch (error) {{
        return res.status(500).json({ error: error.message });
    }};   
};

// Delete a post
const deletePost = async (req, res) => {
    // Check the ID is a  valid type
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid ID.' });
    };

    // Check that the post exists
    const post = await Post.findById(req.params.id);
    if (!post) {
        return res.status(400).json({ error: 'Post not found.' });
    };

    // Check the user owns the post
    const user = await User.findById(req.user._id);

    if (!post.user.equals(user._id)) {
        return res.status(401).json({ error: 'Not authorized to delete this post.' });        
    }

    try {
        await post.deleteOne();
        res.status(200).json({ success: 'Post deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });        
    };
};

// Update a post
const updatePost = async (req, res) => {
    // Grab data from request body
    const { title, body } = req.body;

    // Check that fields are not empty
    if (!title || !body) {
        return res.status(400).json({ error: 'All fields are required' });
    };

    // Check the ID is a valid type
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    };    

    // Check that the post exists
    const post = await Post.findById(req.params.id);
    if (!post) {
        return res.status(400).json({ error: 'Post not found' });
    };

    // Check the user owns the post
    const user = await User.findById(req.user._id);

    if (!post.user.equals(user._id)) {
        return res.status(401).json({ error: 'Not authorized to edit this post.' });        
    }

    try {
        await post.updateOne({ title, body });
        res.status(200).json({ success: 'Post updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

export { getPosts, getUserPosts, addPost, deletePost, updatePost };