import prisma from '@src/configs/prisma';
import { BCryptHash } from '@src/providers/BCryptHash';
import { HashProvider } from '@src/providers/interfaces/HashProvider';
import { PrismaUsersRepository } from '../../repositories/PrismaUsersRepository';
import { RemoveUserService } from '../../services/interfaces/RemoveUserService';
import { RemoveUser } from '../../services/RemoveUser';
import { RemoveUserController } from '../RemoveUserController';

/**
 * Factory to create an instance of the RemoveUserController class.
 *
 * @returns {RemoveUserController} An instance of the RemoveUserController class.
 */
export const RemoveUserControllerFactory = (): RemoveUserController => {
  const hashProvider: HashProvider = new BCryptHash();

  const usersRepository = new PrismaUsersRepository(prisma, hashProvider);

  const removeUserService: RemoveUserService = new RemoveUser(usersRepository);

  return new RemoveUserController(removeUserService);
};
