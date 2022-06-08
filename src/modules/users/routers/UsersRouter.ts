import { Router } from 'express';
import { IMiddleware } from '../../../@types/IMiddleware';
import { createUserController } from '../controllers/factories/createUserController';
import { getAllUsersController } from '../controllers/factories/getAllUsersController';
import { UserInfoValidation } from '../middlewares/UserInfoValidation';

export const UsersRouter = () => {
  const router = Router();

  const userInfoValidation: IMiddleware = new UserInfoValidation();

  router.post(
    '/users/',
    userInfoValidation.execute,
    createUserController().execute
  );

  router.get('/users/', getAllUsersController().execute);

  return router;
};
