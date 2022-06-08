import prisma from '../../../../../configs/prisma';
import { usersMock } from '../../../../../mocks/usersMocks';
import { IUsersRepository } from '../../../../../modules/users/repositories/interfaces/IUsersRepository';
import { PrismaUsersRepository } from '../../../../../modules/users/repositories/PrismaUsersRepository';
import { IUpdateUserService } from '../../../../../modules/users/services/interfaces/IUpdateUserService';
import { UpdateUserService } from '../../../../../modules/users/services/UpdateUserService';
import { BCryptHashProvider } from '../../../../../providers/BCryptHashProvider';
import { IHashProvider } from '../../../../../providers/interfaces/IHashProvider';

describe('UpdateUserService', () => {
  const hashProvider: IHashProvider = new BCryptHashProvider();
  const usersRepository: IUsersRepository = new PrismaUsersRepository(
    prisma,
    hashProvider
  );
  const updateUserService: IUpdateUserService = new UpdateUserService(
    usersRepository
  );

  it('should update a user', async () => {
    jest.spyOn(usersRepository, 'getById').mockImplementation(() => {
      return Promise.resolve(usersMock[0]);
    });
    jest.spyOn(usersRepository, 'getByEmail').mockImplementation(() => {
      return Promise.resolve(null);
    });
    jest.spyOn(usersRepository, 'update').mockImplementation();

    await updateUserService.execute(usersMock[0]);

    expect(usersRepository.getById).toHaveBeenCalledWith(usersMock[0].id);
    expect(usersRepository.getByEmail).toHaveBeenCalledWith(usersMock[0].email);
    expect(usersRepository.update).toHaveBeenCalled();
  });

  it('should throw an error if user with provided id does not exist', async () => {
    jest.spyOn(usersRepository, 'getById').mockImplementation(() => {
      return Promise.resolve(null);
    });

    try {
      await updateUserService.execute(usersMock[0]);
    } catch (error) {
      expect((error as Error).message).toBe(
        'User with provided id does not exist.'
      );
    }
  });

  it('should throw an error if a different user with provided email already exists', async () => {
    jest.spyOn(usersRepository, 'getById').mockImplementation(() => {
      return Promise.resolve(usersMock[0]);
    });
    jest.spyOn(usersRepository, 'getByEmail').mockImplementation(() => {
      return Promise.resolve(usersMock[1]);
    });

    try {
      await updateUserService.execute(usersMock[0]);
    } catch (error) {
      expect((error as Error).message).toBe(
        'User with provided email already exists.'
      );
    }
  });
});
