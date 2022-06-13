import prisma from '@src/configs/prisma';
import { PrismaAuthRepository } from '../PrismaAuthRepository';

export const PrismaAuthRepositoryFactory = () => {
  return new PrismaAuthRepository(prisma);
};
