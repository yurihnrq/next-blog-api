import prisma from '@src/configs/prisma';
import { BCryptHashProvider } from '@src/providers/BCryptHashProvider';
import { HashProvider } from '@src/providers/interfaces/HashProvider';
import { IUsersRepository } from '../interfaces/IUsersRepository';
import { PrismaUsersRepository } from '../PrismaUsersRepository';

export const PrismaUsersRepositoryFactory = (): IUsersRepository => {
  const hashProvider: HashProvider = new BCryptHashProvider();

  const usersRepository: IUsersRepository = new PrismaUsersRepository(
    prisma,
    hashProvider
  );

  return usersRepository;
};
