import { Router } from 'express';
import { IMiddleware } from '../../../types/IMiddleware';
import { CreateUserControllerFactory } from '../controllers/factories/CreateUserControllerFactory';
import { GetAllUsersControllerFactory } from '../controllers/factories/GetAllUsersControllerFactory';
import { GetUserByIdControllerFactory } from '../controllers/factories/GetUserByIdControllerFactory';
import { UserInfoValidation } from '../middlewares/UserInfoValidation';

export const UsersRouter = () => {
  const router = Router();

  const userInfoValidation: IMiddleware = new UserInfoValidation();

  router.post(
    '/users/',
    userInfoValidation.execute,
    CreateUserControllerFactory().execute
  );

  router.get('/users/', GetAllUsersControllerFactory().execute);

  router.get('/users/:id', GetUserByIdControllerFactory().execute);

  return router;
};
