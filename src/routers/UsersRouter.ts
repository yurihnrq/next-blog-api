import { AuthMiddleware } from '@src/middlewares/AuthMiddleware';
import { TokenProvider } from '@src/providers/interfaces/TokenProvider';
import { JwtToken } from '@src/providers/JwtToken';
import { Router } from 'express';
import { CreateUserControllerFactory } from '../modules/users/controllers/factories/CreateUserControllerFactory';
import { GetAllUsersControllerFactory } from '../modules/users/controllers/factories/GetAllUsersControllerFactory';
import { GetUserByIdControllerFactory } from '../modules/users/controllers/factories/GetUserByIdControllerFactory';
import { RemoveUserControllerFactory } from '../modules/users/controllers/factories/RemoveUserControllerFactory';
import { UpdateUserControllerFactory } from '../modules/users/controllers/factories/UpdateUserControllerFactory';
import { UserInfoValidation } from '../middlewares/UserInfoValidation';

export const UsersRouter = () => {
  const router = Router();

  const userInfoValidation: APIMiddleware = new UserInfoValidation();
  const tokenProvider: TokenProvider = new JwtToken(
    process.env.JWT_SECRET as string
  );
  const authMiddleware: APIMiddleware = new AuthMiddleware(tokenProvider);

  router.post(
    '/users/',
    userInfoValidation.execute,
    CreateUserControllerFactory().execute
  );

  router.get('/users/', GetAllUsersControllerFactory().execute);

  router.get('/user/:id', GetUserByIdControllerFactory().execute);

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
