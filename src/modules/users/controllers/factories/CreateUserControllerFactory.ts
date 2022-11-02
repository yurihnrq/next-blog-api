import { CreateUserController } from '../CreateUserController';
import { UsersRepository } from '../../repositories/interfaces/UsersRepository';
import { CreateUser } from '../../services/CreateUser';
import { CreateUserService } from '../../services/interfaces/CreateUserService';
import { PrismaUsersRepositoryFactory } from '../../repositories/factories/PrismaUsersRepositoryFactory';

export const CreateUserControllerFactory = () => {
  const usersRepository: UsersRepository = PrismaUsersRepositoryFactory();

  const createUserService: CreateUserService = new CreateUser(usersRepository);

  return new CreateUserController(createUserService);
};
