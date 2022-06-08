import prisma from '../../../../../configs/prisma';
import { usersMock } from '../../../../../mocks/usersMocks';
import { IUsersRepository } from '../../../../../modules/users/repositories/interfaces/IUsersRepository';
import { PrismaUsersRepository } from '../../../../../modules/users/repositories/PrismaUsersRepository';
import { GetUserByIdService } from '../../../../../modules/users/services/GetUserByIdService';
import { IGetUserByIdService } from '../../../../../modules/users/services/interfaces/IGetUserByIdService';
import { BCryptHashProvider } from '../../../../../providers/BCryptHashProvider';
import { IHashProvider } from '../../../../../providers/interfaces/IHashProvider';

describe('GetUserByIdService', () => {
  const hashProvider: IHashProvider = new BCryptHashProvider();
  const usersRepository: IUsersRepository = new PrismaUsersRepository(
    prisma,
    hashProvider
  );
  const getUserByIdService: IGetUserByIdService = new GetUserByIdService(
    usersRepository
  );

  it('should return a user', async () => {
    jest.spyOn(usersRepository, 'getById').mockImplementation(() => {
      return Promise.resolve(usersMock[0]);
    });

    const returnedUser = await getUserByIdService.execute(
      usersMock[0].id as string
    );

    expect(returnedUser).toEqual(usersMock[0]);
    expect(usersRepository.getById).toHaveBeenCalledWith(usersMock[0].id);
  });

  it('should throw an error if user is not found', async () => {
    jest.spyOn(usersRepository, 'getById').mockImplementation(() => {
      return Promise.resolve(null);
    });

    try {
      await getUserByIdService.execute(usersMock[0].id as string);
    } catch (error) {
      expect((error as Error).message).toBe(
        'User with provided id does not exist.'
      );
    }
  });
});
