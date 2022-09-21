import prisma from '@src/configs/prisma';
import { PrismaPostsRepository } from '../PrismaPostsRepository';

export const PrismaPostsRepositoryFactory = () => {
  const usersRepository = new PrismaPostsRepository(prisma);

  return usersRepository;
};
