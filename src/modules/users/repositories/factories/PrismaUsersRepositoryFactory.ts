import prisma from '@src/configs/prisma';
import { BCryptHash } from '@src/providers/BCryptHash';
import { HashProvider } from '@src/providers/interfaces/HashProvider';
import { UsersRepository } from '../interfaces/UsersRepository';
import { PrismaUsersRepository } from '../PrismaUsersRepository';

export const PrismaUsersRepositoryFactory = (): UsersRepository => {
  const hashProvider: HashProvider = new BCryptHash();

  const usersRepository: UsersRepository = new PrismaUsersRepository(
    prisma,
    hashProvider
  );

  return usersRepository;
};
