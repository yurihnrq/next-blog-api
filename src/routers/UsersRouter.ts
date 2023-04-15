import { AuthMiddleware } from '@src/middlewares/AuthMiddleware';
import { TokenProvider } from '@src/providers/interfaces/TokenProvider';
import { JwtToken } from '@src/providers/JwtToken';
import { Router } from 'express';
import { CreateUserControllerFactory } from '../modules/users/controllers/factories/CreateUserControllerFactory';
import { GetAllUsersControllerFactory } from '../modules/users/controllers/factories/GetAllUsersControllerFactory';
import { GetUserByIdControllerFactory } from '../modules/users/controllers/factories/GetUserByIdControllerFactory';
import { RemoveUserControllerFactory } from '../modules/users/controllers/factories/RemoveUserControllerFactory';
import { UpdateUserControllerFactory } from '../modules/users/controllers/factories/UpdateUserControllerFactory';
import { ValidationMiddleware } from '@src/middlewares/ValidationMiddleware';
import { CreateUserSchema } from '@src/modules/users/interfaces/CreateUserDTO';
import { UpdateUserSchema } from '@src/modules/users/interfaces/UpdateUserDTO';

export const UsersRouter = () => {
  const router = Router();

  const createUserValitator: APIMiddleware = new ValidationMiddleware(
    CreateUserSchema
  );
  const updateUserValidator: APIMiddleware = new ValidationMiddleware(
    UpdateUserSchema
  );
  const tokenProvider: TokenProvider = new JwtToken(
    process.env.JWT_SECRET as string
  );
  const authMiddleware: APIMiddleware = new AuthMiddleware(tokenProvider);

  router.post(
    '/users/',
    createUserValitator.execute,
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
    updateUserValidator.execute,
    UpdateUserControllerFactory().execute
  );

  return router;
};
