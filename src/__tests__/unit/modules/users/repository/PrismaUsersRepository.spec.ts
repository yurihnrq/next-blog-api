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

  it('should get a user by id', async () => {
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

  it('should get a user by email', async () => {
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

  it('should create a user', async () => {
    prisma.user.create = jest.fn().mockImplementation(() => {
      return Promise.resolve(usersMock[0]);
    });

    await usersRepository.create(usersMock[0]);

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: usersMock[0].name,
        email: usersMock[0].email,
        password: usersMock[0].password,
        birthDate: new Date(usersMock[0].birthDate),
        biography: usersMock[0].biography
      }
    });
  });

  it('should update a user', async () => {
    prisma.user.update = jest.fn().mockImplementation(() => {
      return Promise.resolve(usersMock[0]);
    });

    await usersRepository.update(usersMock[0]);

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: {
        id: usersMock[0].id
      },
      data: {
        name: usersMock[0].name,
        email: usersMock[0].email,
        password: usersMock[0].password,
        birthDate: new Date(usersMock[0].birthDate),
        biography: usersMock[0].biography
      }
    });
  });
});