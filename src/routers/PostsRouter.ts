import { AuthMiddleware } from '@src/middlewares/AuthMiddleware';
import { CreatePostControllerFactory } from '@src/modules/posts/controllers/factories/CreatePostControllerFactory';
import { GetAllPostsControllerFactory } from '@src/modules/posts/controllers/factories/GetAllPostsControllerFactory';
import { GetPostByIdControllerFactory } from '@src/modules/posts/controllers/factories/GetPostByIdControllerFactory';
import { RemovePostControllerFactory } from '@src/modules/posts/controllers/factories/RemovePostControllerFactory';
import { UpdatePostControllerFactory } from '@src/modules/posts/controllers/factories/UpdatePostControllerFactory';
import { TokenProvider } from '@src/providers/interfaces/TokenProvider';
import { JwtToken } from '@src/providers/JwtToken';
import { Router } from 'express';

export const PostsRouter = () => {
  const router = Router();

  const tokenProvider: TokenProvider = new JwtToken(
    process.env.JWT_SECRET as string
  );
  const authMiddleware: APIMiddleware = new AuthMiddleware(tokenProvider);

  router.post(
    '/posts',
    authMiddleware.execute,
    CreatePostControllerFactory().execute
  );

  router.get('/posts', GetAllPostsControllerFactory().execute);

  router.get('/posts/:id', GetPostByIdControllerFactory().execute);

  router.delete(
    '/posts/:id',
    authMiddleware.execute,
    RemovePostControllerFactory().execute
  );

  router.put(
    '/posts/:id',
    authMiddleware.execute,
    UpdatePostControllerFactory().execute
  );

  return router;
};
