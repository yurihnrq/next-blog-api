import { PrismaUsersRepositoryFactory } from '../../repositories/factories/PrismaUsersRepositoryFactory';
import { UsersRepository } from '../../repositories/interfaces/UsersRepository';
import { GetUserById } from '../../services/GetUserById';
import { GetUserByIdController } from '../GetUserByIdController';

/**
 * Factory to create an instance of the GetUserByIdController class.
 *
 * @returns {GetUserByIdController} An instance of the GetUserByIdController class.
 */
export const GetUserByIdControllerFactory = () => {
  const usersRepository: UsersRepository = PrismaUsersRepositoryFactory();

  const getUserByIdService = new GetUserById(usersRepository);

  return new GetUserByIdController(getUserByIdService);
};
