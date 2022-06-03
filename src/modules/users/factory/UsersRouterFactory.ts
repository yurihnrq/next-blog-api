import { Router } from 'express';
import prisma from '../../../configs/prisma';
import authJWT from '../../../middlewares/authentication/jwt';
import validateUserInfo from '../../../middlewares/validation/userInfo';
import { UsersControllers } from '../controllers';
import { IUsersControllers, IUsersServices } from '../interfaces';
import { UsersRouter } from '../routes/UsersRouter';
import { UsersPrismaServices } from '../services';

export class UsersRouterFactory implements IRouterFactory {
  public buildRouter = (): IRouter => {
    const usersServices: IUsersServices = new UsersPrismaServices(prisma);
    const usersControllers: IUsersControllers = new UsersControllers(
      usersServices
    );
    const userRouter: IRouter = new UsersRouter(
      usersControllers,
      validateUserInfo,
      authJWT
    );

    return userRouter;
  };

  public router = (): Router => {
    return this.buildRouter().router();
  };
}
