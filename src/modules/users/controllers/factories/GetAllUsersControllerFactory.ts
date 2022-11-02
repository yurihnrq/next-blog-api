import { PrismaUsersRepositoryFactory } from '../../repositories/factories/PrismaUsersRepositoryFactory';
import { UsersRepository } from '../../repositories/interfaces/UsersRepository';
import { GetAllUsersService } from '../../services/GetAllUsers';
import { GetAllUsersService } from '../../services/interfaces/GetAllUsersService';
import { GetAllUsersController } from '../GetAllUsersController';

export const GetAllUsersControllerFactory = () => {
  const usersRepository: UsersRepository = PrismaUsersRepositoryFactory();

  const getAllUsersService: GetAllUsersService = new GetAllUsersService(
    usersRepository
  );

  return new GetAllUsersController(getAllUsersService);
};
