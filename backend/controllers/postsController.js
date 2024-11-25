import mongoose from "mongoose";
import Post from "../models/PostModel.js";

// Get all posts
const getPosts = async (req, res) => {
        
    try {
        const posts = await Post.find();
        res.status(200).json({ posts });

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

    try {
        const post = await Post.create({ title, body });
        res.status(200).json({ success: "post created successfully", post });
    } catch (error) {{
        return res.status(500).json({ error: error.message });
    }};   
};

// Delete a post
 const deletePost = async (req, res) => {
    // Check the ID is a  valid type
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    };

    // Check that the post exists
    const post = await Post.findById(req.params.id);
    if (!post) {
        return res.status(400).json({ error: 'Post not found' });
    };

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

    try {
        await post.updateOne({ title, body });
        res.status(200).json({ success: 'Post updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

export { getPosts, addPost, deletePost, updatePost };