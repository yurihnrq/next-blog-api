import { PrismaUsersRepositoryFactory } from '../../repositories/factories/PrismaUsersRepositoryFactory';
import { UsersRepository } from '../../repositories/interfaces/UsersRepository';
import { GetAllUsers } from '../../services/GetAllUsers';
import { GetAllUsersService } from '../../services/interfaces/GetAllUsersService';
import { GetAllUsersController } from '../GetAllUsersController';

export const GetAllUsersControllerFactory = () => {
  const usersRepository: UsersRepository = PrismaUsersRepositoryFactory();

  const getAllUsersService: GetAllUsersService = new GetAllUsers(
    usersRepository
  );

  return new GetAllUsersController(getAllUsersService);
};
