import { PrismaUsersRepositoryFactory } from '../../repositories/factories/PrismaUsersRepositoryFactory';
import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository';
import { GetUserByIdService } from '../../services/GetUserByIdService';
import { GetUserByIdController } from '../GetUserByIdController';

export const GetUserByIdControllerFactory = () => {
  const usersRepository: IUsersRepository = PrismaUsersRepositoryFactory();

  const getUserByIdService = new GetUserByIdService(usersRepository);

  return new GetUserByIdController(getUserByIdService);
};
