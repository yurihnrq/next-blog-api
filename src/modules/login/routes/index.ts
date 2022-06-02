import { LoginJwtServices } from '../services';
import { LoginControllers } from '../controllers';
import { UsersPrismaServices } from '../../users/services';
import { ILoginControllers, ILoginServices } from '../interfaces';
import { IUsersServices } from '../../users/interfaces';
import { LoginRouter } from './LoginRouter';
import prisma from '../../../configs/prisma';

const loginServices: ILoginServices = new LoginJwtServices();
const usersServices: IUsersServices = new UsersPrismaServices(prisma);
const loginControllers: ILoginControllers = new LoginControllers(
  loginServices,
  usersServices
);

const loginRouter: IRouter = new LoginRouter(loginControllers);

export { loginRouter };
