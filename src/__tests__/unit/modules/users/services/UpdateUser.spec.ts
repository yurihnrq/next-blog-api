import { usersMock } from '@mocks/modules/users/usersMocks';
import { UsersRepositoryMock } from '@mocks/modules/users/repositories/UsersRepositoryMock';
import { UsersRepository } from '@src/modules/users/repositories/interfaces/UsersRepository';
import { UpdateUserService } from '@src/modules/users/services/interfaces/UpdateUserService';
import { UpdateUser } from '@src/modules/users/services/UpdateUser';
import APIError from '@src/errors/APIError';

const usersRepository: UsersRepository = new UsersRepositoryMock();
const updateUserService: UpdateUserService = new UpdateUser(usersRepository);

describe('UpdateUser service', () => {
  it('should update a user', async () => {
    jest.spyOn(usersRepository, 'getById').mockResolvedValue(usersMock[0]);
    jest.spyOn(usersRepository, 'getByEmail').mockResolvedValue(null);
    jest.spyOn(usersRepository, 'update').mockImplementation();

    await updateUserService.execute(usersMock[0]);

    expect(usersRepository.getById).toHaveBeenCalledWith(usersMock[0].id);
    expect(usersRepository.getByEmail).toHaveBeenCalledWith(usersMock[0].email);
    expect(usersRepository.update).toHaveBeenCalled();
  });

  it('should throw an APIError if user with provided id does not exist', async () => {
    jest.spyOn(usersRepository, 'getById').mockResolvedValue(null);

    try {
      await updateUserService.execute(usersMock[0]);
    } catch (error) {
      expect(error).toBeInstanceOf(APIError);
      expect((error as APIError).status).toBe(404);
      expect((error as APIError).message).toBe(
        'User with provided id does not exist.'
      );
    }

    expect.assertions(3);
  });

  it('should throw an APIError if a different user with provided email already exists', async () => {
    jest.spyOn(usersRepository, 'getById').mockResolvedValue(usersMock[0]);
    jest.spyOn(usersRepository, 'getByEmail').mockResolvedValue(usersMock[1]);

    try {
      await updateUserService.execute(usersMock[0]);
    } catch (error) {
      expect(error).toBeInstanceOf(APIError);
      expect((error as APIError).status).toBe(409);
      expect((error as APIError).message).toBe(
        'User with provided email already exists.'
      );
    }

    expect.assertions(3);
  });
});
