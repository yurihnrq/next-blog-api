import prisma from '../../../../../configs/prisma';
import { IUsersServices } from '../../../../../modules/users/interfaces';
import { UsersPrismaServices } from '../../../../../modules/users/services';
import { users as usersMock } from '../../../../../mocks/users';

const usersServices: IUsersServices = new UsersPrismaServices(prisma);

describe('UsersPrismaServices', () => {
  it('should return user by id', async () => {
    prisma.user.findUnique = jest.fn().mockResolvedValue(usersMock[0]);

    const user = await usersServices.getById(usersMock[0].id as string);

    expect(user).toEqual(usersMock[0]);
  });

  it('should return user by email', async () => {
    prisma.user.findUnique = jest.fn().mockResolvedValue(usersMock[0]);

    const user = await usersServices.getByEmail(usersMock[0].email as string);

    expect(user).toEqual(usersMock[0]);
  });

  it('should return all users', async () => {
    prisma.user.findMany = jest.fn().mockResolvedValue(usersMock);

    const users = await usersServices.getAll(1);

    expect(users).toEqual(usersMock);
  });

  it('should create a user', async () => {
    prisma.user.create = jest.fn().mockResolvedValue(usersMock[0]);

    const user = await usersServices.create(usersMock[0]);

    expect(user).toEqual(usersMock[0]);
  });

  it('should update a user', async () => {
    prisma.user.update = jest.fn().mockResolvedValue(usersMock[0]);

    const user = await usersServices.update(usersMock[0]);

    expect(user).toEqual(usersMock[0]);
  });

  it('should remove a user', async () => {
    prisma.user.delete = jest.fn().mockResolvedValue(usersMock[0]);

    const user = await usersServices.remove(usersMock[0].id as string);

    expect(user).toEqual(usersMock[0]);
  });
});
