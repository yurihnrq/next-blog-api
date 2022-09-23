import { usersMock } from '@mocks/modules/users/usersMocks';
import { UsersRepositoryMock } from '@mocks/modules/users/repositories/UsersRepositoryMock';
import { IUsersRepository } from '@src/modules/users/repositories/interfaces/IUsersRepository';
import { IRemoveUserService } from '@src/modules/users/services/interfaces/IRemoveUserService';
import { RemoveUserService } from '@src/modules/users/services/RemoveUserService';
import APIError from '@src/errors/APIError';

const usersRepository: IUsersRepository = new UsersRepositoryMock();
const removeUserService: IRemoveUserService = new RemoveUserService(
  usersRepository
);

describe('GetUserByIdService', () => {
  it('should remove a user', async () => {
    jest.spyOn(usersRepository, 'getById').mockResolvedValue(usersMock[0]);
    jest.spyOn(usersRepository, 'remove');

    await removeUserService.execute(usersMock[0].id as string);

    expect(usersRepository.getById).toHaveBeenCalledWith(usersMock[0].id);
    expect(usersRepository.remove).toHaveBeenCalledWith(usersMock[0].id);
  });

  it('should throw an APIError if user with provided id does not exist', async () => {
    jest.spyOn(usersRepository, 'getById').mockResolvedValue(null);

    try {
      await removeUserService.execute(usersMock[0].id as string);
    } catch (error) {
      expect(error).toBeInstanceOf(APIError);
      expect((error as APIError).message).toBe(
        'User with provided id does not exist.'
      );
    }

    expect.assertions(2);
  });
});
