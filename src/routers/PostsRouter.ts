import { AuthMiddleware } from '@src/middlewares/AuthMiddleware';
import { ValidationMiddleware } from '@src/middlewares/ValidationMiddleware';
import { CreatePostControllerFactory } from '@src/modules/posts/controllers/factories/CreatePostControllerFactory';
import { GetAllPostsControllerFactory } from '@src/modules/posts/controllers/factories/GetAllPostsControllerFactory';
import { GetPostByIdControllerFactory } from '@src/modules/posts/controllers/factories/GetPostByIdControllerFactory';
import { RemovePostControllerFactory } from '@src/modules/posts/controllers/factories/RemovePostControllerFactory';
import { UpdatePostControllerFactory } from '@src/modules/posts/controllers/factories/UpdatePostControllerFactory';
import { CreatePostSchema } from '@src/modules/posts/interfaces/CreatePostDTO';
import { UpdatePostSchema } from '@src/modules/posts/interfaces/UpdatePostDTO';
import { TokenProvider } from '@src/providers/interfaces/TokenProvider';
import { JwtToken } from '@src/providers/JwtToken';
import { Router } from 'express';

/**
 * Setup the router for the posts routes.
 *
 * @returns {Router} The router for the posts routes.
 *
 * @example
 * import { PostsRouter } from '@src/routers/PostsRouter';
 *
 * app.use(PostsRouter());
 */
export const PostsRouter = (): Router => {
  const router = Router();

  const createPostValidator: APIMiddleware = new ValidationMiddleware(
    CreatePostSchema
  );
  const updatePostValitador: APIMiddleware = new ValidationMiddleware(
    UpdatePostSchema
  );

  const tokenProvider: TokenProvider = new JwtToken(
    process.env.JWT_SECRET as string
  );
  const authMiddleware: APIMiddleware = new AuthMiddleware(tokenProvider);

  router.post(
    '/posts',
    authMiddleware.execute,
    createPostValidator.execute,
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
    updatePostValitador.execute,
    UpdatePostControllerFactory().execute
  );

  return router;
};
