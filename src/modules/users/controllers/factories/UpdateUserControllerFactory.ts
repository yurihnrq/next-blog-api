import prisma from '@src/configs/prisma';
import { BCryptHash } from '@src/providers/BCryptHash';
import { HashProvider } from '@src/providers/interfaces/HashProvider';
import { PrismaUsersRepository } from '../../repositories/PrismaUsersRepository';
import { UpdateUserService } from '../../services/interfaces/UpdateUserService';
import { UpdateUser } from '../../services/UpdateUser';
import { UpdateUserController } from '../UpdateUserController';

export const UpdateUserControllerFactory = () => {
  const hashProvider: HashProvider = new BCryptHash();

  const usersRepository = new PrismaUsersRepository(prisma, hashProvider);

  const updateUserService: UpdateUserService = new UpdateUser(usersRepository);

  return new UpdateUserController(updateUserService);
};
