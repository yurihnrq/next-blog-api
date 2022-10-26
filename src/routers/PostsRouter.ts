import { AuthMiddleware } from '@src/middlewares/AuthMiddleware';
import { CreatePostControllerFactory } from '@src/modules/posts/controllers/factories/CreatePostControllerFactory';
import { GetAllPostsControllerFactory } from '@src/modules/posts/controllers/factories/GetAllPostsControllerFactory';
import { GetPostByIdControllerFactory } from '@src/modules/posts/controllers/factories/GetPostByIdControllerFactory';
import { RemovePostControllerFactory } from '@src/modules/posts/controllers/factories/RemovePostControllerFactory';
import { UpdatePostControllerFactory } from '@src/modules/posts/controllers/factories/UpdatePostControllerFactory';
import { TokenProvider } from '@src/providers/interfaces/TokenProvider';
import { JwtTokenProvider } from '@src/providers/JwtTokenProvider';
import { Router } from 'express';

export const PostsRouter = () => {
  const router = Router();

  const tokenProvider: TokenProvider = new JwtTokenProvider(
    process.env.JWT_SECRET as string
  );
  const authMiddleware: APIMiddleware = new AuthMiddleware(tokenProvider);

  router.post(
    '/post',
    authMiddleware.execute,
    CreatePostControllerFactory().execute
  );

  router.get('/posts', GetAllPostsControllerFactory().execute);

  router.get('/post/:id', GetPostByIdControllerFactory().execute);

  router.delete(
    '/post/:id',
    authMiddleware.execute,
    RemovePostControllerFactory().execute
  );

  router.put(
    '/post/:id',
    authMiddleware.execute,
    UpdatePostControllerFactory().execute
  );

  return router;
};
