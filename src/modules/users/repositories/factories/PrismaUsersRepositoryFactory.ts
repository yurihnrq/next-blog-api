import prisma from '@src/configs/prisma';
import { BCryptHashProvider } from '@src/providers/BCryptHashProvider';
import { IHashProvider } from '@src/providers/interfaces/IHashProvider';
import { IUsersRepository } from '../interfaces/IUsersRepository';
import { PrismaUsersRepository } from '../PrismaUsersRepository';

export const PrismaUsersRepositoryFactory = (): IUsersRepository => {
  const hashProvider: IHashProvider = new BCryptHashProvider();

  const usersRepository: IUsersRepository = new PrismaUsersRepository(
    prisma,
    hashProvider
  );

  return usersRepository;
};
