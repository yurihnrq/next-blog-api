import { Router } from 'express';
import prisma from '../../../configs/prisma';
import { IUsersServices } from '../../users/interfaces';
import { UsersPrismaServices } from '../../users/services';
import { LoginControllers } from '../controllers';
import { ILoginControllers, ILoginServices } from '../interfaces';
import { LoginRouter } from '../routes/LoginRouter';
import { LoginJwtServices } from '../services';

export class LoginRouterFactory implements IRouterFactory {
  public buildRouter = (): IRouter => {
    const loginServices: ILoginServices = new LoginJwtServices();
    const usersServices: IUsersServices = new UsersPrismaServices(prisma);
    const loginControllers: ILoginControllers = new LoginControllers(
      loginServices,
      usersServices
    );
    const loginRouter: IRouter = new LoginRouter(loginControllers);

    return loginRouter;
  };

  public router = (): Router => {
    return this.buildRouter().router();
  };
}
