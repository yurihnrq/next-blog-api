import prisma from '../../../../../configs/prisma';
import { usersMock } from '../../../../../mocks/usersMocks';
import { IUsersRepository } from '../../../../../modules/users/repositories/interfaces/IUsersRepository';
import { PrismaUsersRepository } from '../../../../../modules/users/repositories/PrismaUsersRepository';
import { GetAllUsersService } from '../../../../../modules/users/services/GetAllUsersService';
import { BCryptHashProvider } from '../../../../../providers/BCryptHashProvider';
import { IHashProvider } from '../../../../../providers/interfaces/IHashProvider';

describe('GetAllUsersService', () => {
  const hashProvider: IHashProvider = new BCryptHashProvider();
  const usersRepository: IUsersRepository = new PrismaUsersRepository(
    prisma,
    hashProvider
  );
  const getAllUsersService = new GetAllUsersService(usersRepository);

  it('should be able to get all users', async () => {
    jest.spyOn(usersRepository, 'getAll').mockResolvedValue(usersMock);

    const users = await getAllUsersService.execute(1);

    expect(users).toEqual(usersMock);
    expect(usersRepository.getAll).toHaveBeenCalledWith(1);
  });

  it('should throw an error if no users are found', async () => {
    jest.spyOn(usersRepository, 'getAll').mockResolvedValue([]);

    try {
      await getAllUsersService.execute(1);
    } catch (error) {
      expect((error as Error).message).toBe('No users found.');
    }

    expect.assertions(1);
  });
});
