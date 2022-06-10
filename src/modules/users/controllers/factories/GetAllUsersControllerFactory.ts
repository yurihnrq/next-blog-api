import { PrismaUsersRepositoryFactory } from '../../repositories/factories/PrismaUsersRepositoryFactory';
import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository';
import { GetAllUsersService } from '../../services/GetAllUsersService';
import { IGetAllUsersService } from '../../services/interfaces/IGetAllUsersService';
import { GetAllUsersController } from '../GetAllUsersController';

export const GetAllUsersControllerFactory = () => {
  const usersRepository: IUsersRepository = PrismaUsersRepositoryFactory();

  const getAllUsersService: IGetAllUsersService = new GetAllUsersService(
    usersRepository
  );

  return new GetAllUsersController(getAllUsersService);
};
