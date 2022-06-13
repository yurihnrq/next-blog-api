import prisma from '@src/configs/prisma';
import { BCryptHashProvider } from '@src/providers/BCryptHashProvider';
import { IHashProvider } from '@src/providers/interfaces/IHashProvider';
import { PrismaUsersRepository } from '../../repositories/PrismaUsersRepository';
import { IUpdateUserService } from '../../services/interfaces/IUpdateUserService';
import { UpdateUserService } from '../../services/UpdateUserService';
import { UpdateUserController } from '../UpdateUserController';

export const UpdateUserControllerFactory = () => {
  const hashProvider: IHashProvider = new BCryptHashProvider();

  const usersRepository = new PrismaUsersRepository(prisma, hashProvider);

  const updateUserService: IUpdateUserService = new UpdateUserService(
    usersRepository
  );

  return new UpdateUserController(updateUserService);
};
