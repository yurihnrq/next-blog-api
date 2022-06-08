import prisma from '../../../../configs/prisma';
import { BCryptHashProvider } from '../../../../providers/BCryptHashProvider';
import { IHashProvider } from '../../../../providers/interfaces/IHashProvider';
import { CreateUserController } from '../CreateUserController';
import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository';
import { PrismaUsersRepository } from '../../repositories/PrismaUsersRepository';
import { CreateUserService } from '../../services/CreateUserService';
import { ICreateUserService } from '../../services/interfaces/ICreateUserService';

export const createUserController = () => {
  const hashProvider: IHashProvider = new BCryptHashProvider();

  const usersRepository: IUsersRepository = new PrismaUsersRepository(
    prisma,
    hashProvider
  );

  const createUserService: ICreateUserService = new CreateUserService(
    usersRepository
  );

  return new CreateUserController(createUserService);
};
