import { usersMock } from '@mocks/modules/users/usersMocks';
import { UsersRepositoryMock } from '@mocks/modules/users/repositories/UsersRepositoryMock';
import { UsersRepository } from '@src/modules/users/repositories/interfaces/UsersRepository';
import { GetUserById } from '@src/modules/users/services/GetUserById';
import { GetUserByIdService } from '@src/modules/users/services/interfaces/GetUserByIdService';
import APIError from '@src/errors/APIError';

const usersRepository: UsersRepository = new UsersRepositoryMock();
const getUserByIdService: GetUserByIdService = new GetUserById(usersRepository);

describe('GetUserById service', () => {
  it('should return a user', async () => {
    jest.spyOn(usersRepository, 'getById').mockResolvedValue(usersMock[0]);

    const returnedUser = await getUserByIdService.execute(usersMock[0].id);

    expect(returnedUser).toEqual(usersMock[0]);
    expect(usersRepository.getById).toHaveBeenCalledWith(usersMock[0].id);
  });

  it('should throw an APIError if user is not found', async () => {
    jest.spyOn(usersRepository, 'getById').mockResolvedValue(null);

    try {
      await getUserByIdService.execute(usersMock[0].id);
    } catch (error) {
      expect(error).toBeInstanceOf(APIError);
      expect((error as APIError).status).toBe(404);
      expect((error as APIError).message).toBe(
        'User with provided id does not exist.'
      );
    }

    expect.assertions(3);
  });
});
