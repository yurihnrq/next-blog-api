import { CreatePostControllerFactory } from '@src/modules/post/controllers/factories/CreatePostControllerFactory';
import { Router } from 'express';

export const PostsRouter = () => {
  const router = Router();

  router.post('/post', CreatePostControllerFactory().execute);

  return router;
};
