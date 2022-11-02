import { usersMock } from '@mocks/modules/users/usersMocks';
import { UsersRepositoryMock } from '@mocks/modules/users/repositories/UsersRepositoryMock';
import { UsersRepository } from '@src/modules/users/repositories/interfaces/UsersRepository';
import { CreateUser } from '@src/modules/users/services/CreateUser';
import { CreateUserService } from '@src/modules/users/services/interfaces/CreateUserService';
import APIError from '@src/errors/APIError';

const usersRepository: UsersRepository = new UsersRepositoryMock();
const createUserService: CreateUserService = new CreateUser(usersRepository);

describe('CreateUser service', () => {
  it('should create a user', async () => {
    jest.spyOn(usersRepository, 'create');
    jest.spyOn(usersRepository, 'getByEmail').mockResolvedValue(null);

    await createUserService.execute(usersMock[0]);

    expect(usersRepository.create).toHaveBeenCalledWith(usersMock[0]);
  });

  it('should throw an APIError if user with provided email already exists', async () => {
    try {
      await createUserService.execute(usersMock[0]);
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
