import { UsersControllers } from '../controllers';
import authJWT from '../../../middlewares/authentication/jwt';
import validateUserInfo from '../../../middlewares/validation/userInfo';
import { UsersPrismaServices } from '../services';
import { IUsersControllers, IUsersServices } from '../interfaces';
import { UsersRouter } from './UsersRouter';
import prisma from '../../../configs/prisma';

const usersServices: IUsersServices = new UsersPrismaServices(prisma);
const usersControllers: IUsersControllers = new UsersControllers(usersServices);
const usersRouter: IRouter = new UsersRouter(
  usersControllers,
  validateUserInfo,
  authJWT
);

export { usersRouter };
