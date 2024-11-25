import express from 'express';
import { addPost, getPosts, deletePost, updatePost } from '../controllers/postsController.js';
const router = express.Router();

// Get all posts route
router.get('/', getPosts);

// Add new post route
router.post('/', addPost);

// Delete post route
router.delete('/:id', deletePost);

// Update post route
router.put('/:id', updatePost);

export { router as postsRoutes };