import express from 'express';
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  deleteAllPosts,
  likePost,
} from '../controllers/postsController.js';

const router = express.Router();

router.route('/').get(getPosts).post(createPost).delete(deleteAllPosts);
router.route('/:id').patch(updatePost).delete(deletePost);
router.route('/like/:id').patch(likePost);
export default router;
