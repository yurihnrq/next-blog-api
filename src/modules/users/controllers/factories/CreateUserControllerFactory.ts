import { CreateUserController } from '../CreateUserController';
import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository';
import { CreateUserService } from '../../services/CreateUserService';
import { ICreateUserService } from '../../services/interfaces/ICreateUserService';
import { PrismaUsersRepositoryFactory } from '../../repositories/factories/PrismaUsersRepositoryFactory';

export const CreateUserControllerFactory = () => {
  const usersRepository: IUsersRepository = PrismaUsersRepositoryFactory();

  const createUserService: ICreateUserService = new CreateUserService(
    usersRepository
  );

  return new CreateUserController(createUserService);
};
