import { usersMock } from '@mocks/modules/users/usersMocks';
import { UsersRepositoryMock } from '@mocks/modules/users/repositories/UsersRepositoryMock';
import { IUsersRepository } from '@src/modules/users/repositories/interfaces/IUsersRepository';
import { CreateUserService } from '@src/modules/users/services/CreateUserService';
import { ICreateUserService } from '@src/modules/users/services/interfaces/ICreateUserService';

const usersRepository: IUsersRepository = new UsersRepositoryMock();
const createUserService: ICreateUserService = new CreateUserService(
  usersRepository
);

describe('CreateUserService', () => {
  it('should create a user', async () => {
    jest.spyOn(usersRepository, 'create');
    jest.spyOn(usersRepository, 'getByEmail').mockResolvedValue(null);

    await createUserService.execute(usersMock[0]);

    expect(usersRepository.create).toHaveBeenCalledWith(usersMock[0]);
  });

  it('should throw an error if user with provided email already exists', async () => {
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
