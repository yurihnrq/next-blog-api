import prisma from '@src/configs/prisma';
import { BCryptHash } from '@src/providers/BCryptHash';
import { HashProvider } from '@src/providers/interfaces/HashProvider';
import { PrismaUsersRepository } from '../../repositories/PrismaUsersRepository';
import { RemoveUserService } from '../../services/interfaces/RemoveUserService';
import { RemoveUser } from '../../services/RemoveUser';
import { RemoveUserController } from '../RemoveUserController';

export const RemoveUserControllerFactory = () => {
  const hashProvider: HashProvider = new BCryptHash();

  const usersRepository = new PrismaUsersRepository(prisma, hashProvider);

  const removeUserService: RemoveUserService = new RemoveUser(usersRepository);

  return new RemoveUserController(removeUserService);
};
