import { Router } from 'express';
import { getAllPosts } from '../controllers/posts.controllers';

const router = Router();

router.get('/posts/', getAllPosts);

export default router;
