import { PrismaUsersRepositoryFactory } from '../../repositories/factories/PrismaUsersRepositoryFactory';
import { UsersRepository } from '../../repositories/interfaces/UsersRepository';
import { GetUserByIdService } from '../../services/GetUserById';
import { GetUserByIdController } from '../GetUserByIdController';

export const GetUserByIdControllerFactory = () => {
  const usersRepository: UsersRepository = PrismaUsersRepositoryFactory();

  const getUserByIdService = new GetUserByIdService(usersRepository);

  return new GetUserByIdController(getUserByIdService);
};
