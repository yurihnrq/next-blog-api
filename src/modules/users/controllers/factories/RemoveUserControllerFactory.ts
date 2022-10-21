import prisma from '@src/configs/prisma';
import { BCryptHashProvider } from '@src/providers/BCryptHashProvider';
import { HashProvider } from '@src/providers/interfaces/HashProvider';
import { PrismaUsersRepository } from '../../repositories/PrismaUsersRepository';
import { IRemoveUserService } from '../../services/interfaces/IRemoveUserService';
import { RemoveUserService } from '../../services/RemoveUserService';
import { RemoveUserController } from '../RemoveUserController';

export const RemoveUserControllerFactory = () => {
  const hashProvider: HashProvider = new BCryptHashProvider();

  const usersRepository = new PrismaUsersRepository(prisma, hashProvider);

  const removeUserService: IRemoveUserService = new RemoveUserService(
    usersRepository
  );

  return new RemoveUserController(removeUserService);
};
