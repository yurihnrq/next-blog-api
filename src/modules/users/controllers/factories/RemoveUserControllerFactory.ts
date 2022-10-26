import prisma from '@src/configs/prisma';
import { BCryptHash } from '@src/providers/BCryptHash';
import { HashProvider } from '@src/providers/interfaces/HashProvider';
import { PrismaUsersRepository } from '../../repositories/PrismaUsersRepository';
import { IRemoveUserService } from '../../services/interfaces/IRemoveUserService';
import { RemoveUserService } from '../../services/RemoveUserService';
import { RemoveUserController } from '../RemoveUserController';

export const RemoveUserControllerFactory = () => {
  const hashProvider: HashProvider = new BCryptHash();

  const usersRepository = new PrismaUsersRepository(prisma, hashProvider);

  const removeUserService: IRemoveUserService = new RemoveUserService(
    usersRepository
  );

  return new RemoveUserController(removeUserService);
};
