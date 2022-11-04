import prisma from '@src/configs/prisma';
import { AuthRepository } from '@src/modules/auth/repositories/interfaces/AuthRepository';
import { PrismaAuthRepository } from '@src/modules/auth/repositories/PrismaAuthRepository';
import { usersMock } from '@src/__mocks__/modules/users/usersMocks';

const prismaAuthRepository: AuthRepository = new PrismaAuthRepository(prisma);

describe('PrismaAuthRepository', () => {
  it('should return a user by email calling prisma client', async () => {
    const email = 'test@mail.com';
    prisma.user.findUnique = jest.fn().mockResolvedValue(usersMock[0]);

    const user = await prismaAuthRepository.getByEmail(email);

    expect(user).toEqual(usersMock[0]);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: {
        email
      }
    });
  });
});
