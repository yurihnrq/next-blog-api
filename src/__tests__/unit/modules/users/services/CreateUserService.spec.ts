import prisma from '../../../../../configs/prisma';
import { IUsersRepository } from '../../../../../modules/users/repositories/interfaces/IUsersRepository';
import { PrismaUsersRepository } from '../../../../../modules/users/repositories/PrismaUsersRepository';
import { CreateUserService } from '../../../../../modules/users/services/CreateUserService';
import { ICreateUserService } from '../../../../../modules/users/services/interfaces/ICreateUserService';
import { BCryptHashProvider } from '../../../../../providers/BCryptHashProvider';
import { IHashProvider } from '../../../../../providers/interfaces/IHashProvider';
import { usersMock } from '../../../../../mocks/usersMocks';

describe('CreateUserService', () => {
  const hashProvider: IHashProvider = new BCryptHashProvider();
  const usersRepository: IUsersRepository = new PrismaUsersRepository(
    prisma,
    hashProvider
  );
  jest.spyOn(usersRepository, 'create').mockImplementation(() => {
    return Promise.resolve(usersMock[1]);
  });
  const createUserService: ICreateUserService = new CreateUserService(
    usersRepository
  );

  it('should create a user', async () => {
    jest.spyOn(usersRepository, 'getByEmail').mockImplementation(() => {
      return Promise.resolve(null);
    });

    await createUserService.execute(usersMock[0]);

    expect(usersRepository.create).toHaveBeenCalledWith(usersMock[0]);
  });

  it('should throw an error if user with provided email already exists', async () => {
    jest.spyOn(usersRepository, 'getByEmail').mockImplementation(() => {
      return Promise.resolve(usersMock[1]);
    });

    try {
      await createUserService.execute(usersMock[0]);
    } catch (error) {
      expect((error as Error).message).toBe(
        'User with provided email already exists.'
      );
    }

    expect.assertions(1);
  });
});
