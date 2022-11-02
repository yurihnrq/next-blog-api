import { usersMock } from '@mocks/modules/users/usersMocks';
import { HashProviderMock } from '@mocks/providers/HashProviderMock';
import prisma from '@src/configs/prisma';
import { CreateUserDTO } from '@src/modules/users/interfaces/CreateUserDTO';
import { UpdateUserDTO } from '@src/modules/users/interfaces/UpdateUserDTO';
import { UsersRepository } from '@src/modules/users/repositories/interfaces/UsersRepository';
import { PrismaUsersRepository } from '@src/modules/users/repositories/PrismaUsersRepository';
import { HashProvider } from '@src/providers/interfaces/HashProvider';

const hashProvider: HashProvider = new HashProviderMock();
const usersRepository: UsersRepository = new PrismaUsersRepository(
  prisma,
  hashProvider
);

describe('PrismaUsersRepository', () => {
  it('should get a user by id', async () => {
    prisma.user.findUnique = jest.fn().mockResolvedValue(usersMock[0]);

    const user = await usersRepository.getById('1');

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: {
        id: '1'
      }
    });
    expect(user).toEqual(usersMock[0]);
  });

  it('should get a user by email', async () => {
    prisma.user.findUnique = jest.fn().mockResolvedValue(usersMock[0]);

    const user = await usersRepository.getByEmail(usersMock[0].email);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: {
        email: usersMock[0].email
      }
    });
    expect(user).toEqual(usersMock[0]);
  });

  it('should get all users', async () => {
    prisma.user.findMany = jest.fn().mockResolvedValue(usersMock);

    const users = await usersRepository.getAll(1);

    expect(prisma.user.findMany).toHaveBeenCalledWith({
      take: 10,
      skip: 10 * (1 - 1)
    });
    expect(users).toEqual(usersMock);
  });

  it('should create a user', async () => {
    const createUserData: CreateUserDTO = {
      ...usersMock[0]
    };
    prisma.user.create = jest.fn().mockResolvedValue(createUserData);

    await usersRepository.create(createUserData);

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: createUserData.name,
        email: createUserData.email,
        password: usersMock[0].password,
        birthDate: new Date(createUserData.birthDate),
        biography: createUserData.biography
      }
    });
  });

  it('should update a user', async () => {
    const updateUserData: UpdateUserDTO = {
      ...usersMock[0]
    };
    prisma.user.update = jest.fn().mockResolvedValue(updateUserData);

    await usersRepository.update(updateUserData);

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: {
        id: updateUserData.id
      },
      data: {
        name: updateUserData.name,
        email: updateUserData.email,
        password: updateUserData.password,
        birthDate: new Date(updateUserData.birthDate),
        biography: updateUserData.biography
      }
    });
  });

  it('should delete an user', async () => {
    const userId = usersMock[0].id;
    prisma.user.delete = jest.fn().mockResolvedValue(usersMock[0]);

    await usersRepository.remove(userId);

    expect(prisma.user.delete).toHaveBeenCalledWith({
      where: {
        id: userId
      }
    });
  });
});
