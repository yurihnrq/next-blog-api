import { AuthMiddleware } from '@src/modules/auth/middlewares/AuthMiddleware';
import { ITokenProvider } from '@src/providers/interfaces/ITokenProvider';
import { JwtTokenProvider } from '@src/providers/JwtTokenProvider';
import { Router } from 'express';
import { IMiddleware } from '../../../types/IMiddleware';
import { CreateUserControllerFactory } from '../controllers/factories/CreateUserControllerFactory';
import { GetAllUsersControllerFactory } from '../controllers/factories/GetAllUsersControllerFactory';
import { GetUserByIdControllerFactory } from '../controllers/factories/GetUserByIdControllerFactory';
import { RemoveUserControllerFactory } from '../controllers/factories/RemoveUserControllerFactory';
import { UpdateUserControllerFactory } from '../controllers/factories/UpdateUserControllerFactory';
import { UserInfoValidation } from '../middlewares/UserInfoValidation';

export const UsersRouter = () => {
  const router = Router();

  const userInfoValidation: IMiddleware = new UserInfoValidation();
  const tokenProvider: ITokenProvider = new JwtTokenProvider(
    process.env.JWT_SECRET as string
  );
  const authMiddleware: IMiddleware = new AuthMiddleware(tokenProvider);

  router.post(
    '/users/',
    userInfoValidation.execute,
    CreateUserControllerFactory().execute
  );

  router.get('/users/', GetAllUsersControllerFactory().execute);

  router.get('/users/:id', GetUserByIdControllerFactory().execute);

  router.delete(
    '/users/:id',
    authMiddleware.execute,
    RemoveUserControllerFactory().execute
  );

  router.put(
    '/users/:id',
    authMiddleware.execute,
    userInfoValidation.execute,
    UpdateUserControllerFactory().execute
  );

  return router;
};
