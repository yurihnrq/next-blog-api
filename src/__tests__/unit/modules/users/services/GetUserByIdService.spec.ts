import { usersMock } from '@mocks/modules/users/usersMocks';
import { UsersRepositoryMock } from '@mocks/modules/users/repositories/UsersRepositoryMock';
import { IUsersRepository } from '@src/modules/users/repositories/interfaces/IUsersRepository';
import { GetUserByIdService } from '@src/modules/users/services/GetUserByIdService';
import { IGetUserByIdService } from '@src/modules/users/services/interfaces/IGetUserByIdService';
import APIError from '@src/errors/APIError';

const usersRepository: IUsersRepository = new UsersRepositoryMock();
const getUserByIdService: IGetUserByIdService = new GetUserByIdService(
  usersRepository
);

describe('GetUserByIdService', () => {
  it('should return a user', async () => {
    jest.spyOn(usersRepository, 'getById').mockResolvedValue(usersMock[0]);

    const returnedUser = await getUserByIdService.execute(
      usersMock[0].id as string
    );

    expect(returnedUser).toEqual(usersMock[0]);
    expect(usersRepository.getById).toHaveBeenCalledWith(usersMock[0].id);
  });

  it('should throw an APIError if user is not found', async () => {
    jest.spyOn(usersRepository, 'getById').mockResolvedValue(null);

    try {
      await getUserByIdService.execute(usersMock[0].id as string);
    } catch (error) {
      expect(error).toBeInstanceOf(APIError);
      expect((error as APIError).message).toBe(
        'User with provided id does not exist.'
      );
    }

    expect.assertions(2);
  });
});
