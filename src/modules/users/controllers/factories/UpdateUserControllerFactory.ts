import prisma from '@src/configs/prisma';
import { BCryptHash } from '@src/providers/BCryptHash';
import { HashProvider } from '@src/providers/interfaces/HashProvider';
import { PrismaUsersRepository } from '../../repositories/PrismaUsersRepository';
import { IUpdateUserService } from '../../services/interfaces/IUpdateUserService';
import { UpdateUserService } from '../../services/UpdateUserService';
import { UpdateUserController } from '../UpdateUserController';

export const UpdateUserControllerFactory = () => {
  const hashProvider: HashProvider = new BCryptHash();

  const usersRepository = new PrismaUsersRepository(prisma, hashProvider);

  const updateUserService: IUpdateUserService = new UpdateUserService(
    usersRepository
  );

  return new UpdateUserController(updateUserService);
};
