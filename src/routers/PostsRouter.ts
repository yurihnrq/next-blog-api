import { AuthMiddleware } from '@src/middlewares/AuthMiddleware';
import { CreatePostControllerFactory } from '@src/modules/post/controllers/factories/CreatePostControllerFactory';
import { GetAllPostsControllerFactory } from '@src/modules/post/controllers/factories/GetAllPostsControllerFactory';
import { ITokenProvider } from '@src/providers/interfaces/ITokenProvider';
import { JwtTokenProvider } from '@src/providers/JwtTokenProvider';
import { Router } from 'express';

export const PostsRouter = () => {
  const router = Router();

  const tokenProvider: ITokenProvider = new JwtTokenProvider(
    process.env.JWT_SECRET as string
  );
  const authMiddleware: IMiddleware = new AuthMiddleware(tokenProvider);

  router.post(
    '/post',
    authMiddleware.execute,
    CreatePostControllerFactory().execute
  );

  router.get('/posts', GetAllPostsControllerFactory().execute);

  return router;
};
