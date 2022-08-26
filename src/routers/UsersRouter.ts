import { AuthMiddleware } from '@src/middlewares/AuthMiddleware';
import { ITokenProvider } from '@src/providers/interfaces/ITokenProvider';
import { JwtTokenProvider } from '@src/providers/JwtTokenProvider';
import { Router } from 'express';
import { IMiddleware } from '../types/IMiddleware';
import { CreateUserControllerFactory } from '../modules/users/controllers/factories/CreateUserControllerFactory';
import { GetAllUsersControllerFactory } from '../modules/users/controllers/factories/GetAllUsersControllerFactory';
import { GetUserByIdControllerFactory } from '../modules/users/controllers/factories/GetUserByIdControllerFactory';
import { RemoveUserControllerFactory } from '../modules/users/controllers/factories/RemoveUserControllerFactory';
import { UpdateUserControllerFactory } from '../modules/users/controllers/factories/UpdateUserControllerFactory';
import { UserInfoValidation } from '../middlewares/UserInfoValidation';

export const UsersRouter = () => {
  const router = Router();

  const userInfoValidation: IMiddleware = new UserInfoValidation();
  const tokenProvider: ITokenProvider = new JwtTokenProvider(
    process.env.JWT_SECRET as string
  );
  const authMiddleware: IMiddleware = new AuthMiddleware(tokenProvider);

  router.post(
    '/user/',
    userInfoValidation.execute,
    CreateUserControllerFactory().execute
  );

  router.get('/users/', GetAllUsersControllerFactory().execute);

  router.get('/user/:id', GetUserByIdControllerFactory().execute);

  router.delete(
    '/user/:id',
    authMiddleware.execute,
    RemoveUserControllerFactory().execute
  );

  router.put(
    '/user/:id',
    authMiddleware.execute,
    userInfoValidation.execute,
    UpdateUserControllerFactory().execute
  );

  return router;
};
