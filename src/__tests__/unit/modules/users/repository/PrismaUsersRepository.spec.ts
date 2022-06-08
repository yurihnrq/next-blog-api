import prisma from '../../../../../configs/prisma';
import { IUsersRepository } from '../../../../../modules/users/repositories/interfaces/IUsersRepository';
import { PrismaUsersRepository } from '../../../../../modules/users/repositories/PrismaUsersRepository';
import { BCryptHashProvider } from '../../../../../providers/BCryptHashProvider';
import { IHashProvider } from '../../../../../providers/interfaces/IHashProvider';
import { usersMock } from '../../../../../mocks/usersMocks';

describe('PrismaUsersRepository', () => {
  const hashProvider: IHashProvider = new BCryptHashProvider();
  jest
    .spyOn(hashProvider, 'generateHash')
    .mockImplementation((password: string) => {
      return Promise.resolve(password);
    });
  const usersRepository: IUsersRepository = new PrismaUsersRepository(
    prisma,
    hashProvider
  );

  it('should get an user by id', async () => {
    prisma.user.findUnique = jest.fn().mockImplementation(() => {
      return Promise.resolve(usersMock[0]);
    });

    await usersRepository.getById('1');

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: {
        id: '1'
      }
    });
  });

  it('should get an user by email', async () => {
    prisma.user.findUnique = jest.fn().mockImplementation(() => {
      return Promise.resolve(usersMock[0]);
    });

    await usersRepository.getByEmail(usersMock[0].email);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: {
        email: usersMock[0].email
      }
    });
  });

  it('should get all users', async () => {
    prisma.user.findMany = jest.fn().mockImplementation(() => {
      return Promise.resolve(usersMock);
    });

    await usersRepository.getAll(1);

    expect(prisma.user.findMany).toHaveBeenCalledWith({
      take: 10,
      skip: 10 * (1 - 1)
    });
  });
});
