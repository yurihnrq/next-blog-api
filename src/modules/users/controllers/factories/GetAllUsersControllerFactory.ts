import { PrismaUsersRepositoryFactory } from '../../repositories/factories/PrismaUsersRepositoryFactory';
import { UsersRepository } from '../../repositories/interfaces/UsersRepository';
import { GetAllUsers } from '../../services/GetAllUsers';
import { GetAllUsersService } from '../../services/interfaces/GetAllUsersService';
import { GetAllUsersController } from '../GetAllUsersController';

/**
 * Factory to create an instance of the GetAllUsersController class.
 *
 * @returns {GetAllUsersController} An instance of the GetAllUsersController class.
 */
export const GetAllUsersControllerFactory = (): GetAllUsersController => {
  const usersRepository: UsersRepository = PrismaUsersRepositoryFactory();

  const getAllUsersService: GetAllUsersService = new GetAllUsers(
    usersRepository
  );

  return new GetAllUsersController(getAllUsersService);
};
