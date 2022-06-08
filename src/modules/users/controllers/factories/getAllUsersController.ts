import prisma from '../../../../configs/prisma';
import { BCryptHashProvider } from '../../../../providers/BCryptHashProvider';
import { IHashProvider } from '../../../../providers/interfaces/IHashProvider';
import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository';
import { PrismaUsersRepository } from '../../repositories/PrismaUsersRepository';
import { GetAllUsersService } from '../../services/GetAllUsersService';
import { IGetAllUsersService } from '../../services/interfaces/IGetAllUsersService';
import { GetAllUsersController } from '../GetAllUsersController';

export const getAllUsersController = () => {
  const hashProvider: IHashProvider = new BCryptHashProvider();

  const usersRepository: IUsersRepository = new PrismaUsersRepository(
    prisma,
    hashProvider
  );

  const getAllUsersService: IGetAllUsersService = new GetAllUsersService(
    usersRepository
  );

  return new GetAllUsersController(getAllUsersService);
};
