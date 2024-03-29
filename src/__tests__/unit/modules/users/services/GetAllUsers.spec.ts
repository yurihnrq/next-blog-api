import { usersMock } from '@mocks/modules/users/usersMocks';
import { UsersRepositoryMock } from '@mocks/modules/users/repositories/UsersRepositoryMock';
import { UsersRepository } from '@src/modules/users/repositories/interfaces/UsersRepository';
import { GetAllUsers } from '@src/modules/users/services/GetAllUsers';
import APIError from '@src/errors/APIError';

const usersRepository: UsersRepository = new UsersRepositoryMock();
const getAllUsersService = new GetAllUsers(usersRepository);

describe('GetAllUsers service', () => {
  it('should be able to get all users', async () => {
    jest.spyOn(usersRepository, 'getAll').mockResolvedValue(usersMock);

    const users = await getAllUsersService.execute(1);

    expect(users).toEqual(usersMock);
    expect(usersRepository.getAll).toHaveBeenCalledWith(1);
  });

  it('should throw an APIError if no users are found', async () => {
    jest.spyOn(usersRepository, 'getAll').mockResolvedValue([]);

    try {
      await getAllUsersService.execute(1);
    } catch (error) {
      expect(error).toBeInstanceOf(APIError);
      expect((error as APIError).status).toBe(204);
      expect((error as APIError).message).toBe('No users found.');
    }

    expect.assertions(3);
  });
});
