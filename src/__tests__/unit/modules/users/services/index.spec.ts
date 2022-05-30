import prisma from '../../../../../configs/prisma';
import usersServices from '../../../../../modules/users/services/';
import { users as usersMock } from '../../../../../mocks/users/';

describe('UsersService', () => {
  it('should return an array of users', async () => {
    prisma.user.findMany = jest.fn().mockResolvedValue(usersMock);
    const users = await usersServices.getAll(1);

    expect(users).toEqual(usersMock);
  });
});
