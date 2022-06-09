import prisma from '../../../../../configs/prisma';
import { usersMock } from '../../../../../mocks/usersMocks';
import { IUsersRepository } from '../../../../../modules/users/repositories/interfaces/IUsersRepository';
import { PrismaUsersRepository } from '../../../../../modules/users/repositories/PrismaUsersRepository';
import { IRemoveUserService } from '../../../../../modules/users/services/interfaces/IRemoveUserService';
import { RemoveUserService } from '../../../../../modules/users/services/RemoveUserService';
import { BCryptHashProvider } from '../../../../../providers/BCryptHashProvider';
import { IHashProvider } from '../../../../../providers/interfaces/IHashProvider';

describe('GetUserByIdService', () => {
  const hashProvider: IHashProvider = new BCryptHashProvider();
  const usersRepository: IUsersRepository = new PrismaUsersRepository(
    prisma,
    hashProvider
  );
  const removeUserService: IRemoveUserService = new RemoveUserService(
    usersRepository
  );

  it('should remove a user', async () => {
    jest.spyOn(usersRepository, 'getById').mockResolvedValue(usersMock[0]);
    jest.spyOn(usersRepository, 'remove').mockImplementation();

    await removeUserService.execute(usersMock[0].id as string);

    expect(usersRepository.getById).toHaveBeenCalledWith(usersMock[0].id);
    expect(usersRepository.remove).toHaveBeenCalledWith(usersMock[0].id);
  });

  it('should throw an error if user with provided id does not exist', async () => {
    jest.spyOn(usersRepository, 'getById').mockResolvedValue(null);

    try {
      await removeUserService.execute(usersMock[0].id as string);
    } catch (error) {
      expect((error as Error).message).toBe(
        'User with provided id does not exist.'
      );
    }

    expect.assertions(1);
  });
});
