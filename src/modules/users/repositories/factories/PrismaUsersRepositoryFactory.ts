import prisma from '@src/configs/prisma';
import { BCryptHash } from '@src/providers/BCryptHash';
import { HashProvider } from '@src/providers/interfaces/HashProvider';
import { UsersRepository } from '../interfaces/UsersRepository';
import { PrismaUsersRepository } from '../PrismaUsersRepository';

/**
 * Factory to create an instance of the PrismaUsersRepository class.
 *
 * @returns {UsersRepository} An instance of the PrismaUsersRepository class.
 */
export const PrismaUsersRepositoryFactory = (): UsersRepository => {
  const hashProvider: HashProvider = new BCryptHash();

  const usersRepository: UsersRepository = new PrismaUsersRepository(
    prisma,
    hashProvider
  );

  return usersRepository;
};
