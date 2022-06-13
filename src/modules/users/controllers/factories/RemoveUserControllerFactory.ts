import prisma from '@src/configs/prisma';
import { BCryptHashProvider } from '@src/providers/BCryptHashProvider';
import { IHashProvider } from '@src/providers/interfaces/IHashProvider';
import { PrismaUsersRepository } from '../../repositories/PrismaUsersRepository';
import { IRemoveUserService } from '../../services/interfaces/IRemoveUserService';
import { RemoveUserService } from '../../services/RemoveUserService';
import { RemoveUserController } from '../RemoveUserController';

export const RemoveUserControllerFactory = () => {
  const hashProvider: IHashProvider = new BCryptHashProvider();

  const usersRepository = new PrismaUsersRepository(prisma, hashProvider);

  const removeUserService: IRemoveUserService = new RemoveUserService(
    usersRepository
  );

  return new RemoveUserController(removeUserService);
};
