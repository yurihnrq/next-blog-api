import prisma from '@src/configs/prisma';
import { BCryptHash } from '@src/providers/BCryptHash';
import { HashProvider } from '@src/providers/interfaces/HashProvider';
import { IUsersRepository } from '../interfaces/IUsersRepository';
import { PrismaUsersRepository } from '../PrismaUsersRepository';

export const PrismaUsersRepositoryFactory = (): IUsersRepository => {
  const hashProvider: HashProvider = new BCryptHash();

  const usersRepository: IUsersRepository = new PrismaUsersRepository(
    prisma,
    hashProvider
  );

  return usersRepository;
};
