import { IAuthRepository } from '@src/modules/auth/repositories/interfaces/IAuthRepository';
import { ClientAuthService } from '@src/modules/auth/services/ClientAuthService';
import { IAuthInfo } from '@src/modules/auth/services/interfaces/IAuthInfo';
import { IClientAuthService } from '@src/modules/auth/services/interfaces/IClientAuthService';
import { AuthRepositoryMock } from '@mocks/modules/auth/repositories/AuthRepositoryMock';
import APIError from '@src/errors/APIError';

const authRepository: IAuthRepository = new AuthRepositoryMock();
const clientAuthService: IClientAuthService = new ClientAuthService(
  authRepository
);

const loginInfo = {
  email: 'test@mail.com',
  password: 'test-password'
};

describe('ClientAuthService', () => {
  it('should return an IAuthInfo object', async () => {
    const authInfo: IAuthInfo = await clientAuthService.execute(
      loginInfo.email,
      loginInfo.password
    );

    expect(authInfo).toBeDefined();
  });

  it('should return an IAuthInfo object only if fetch a user with provided email from repository', async () => {
    jest.spyOn(authRepository, 'getByEmail');

    const authInfo: IAuthInfo = await clientAuthService.execute(
      loginInfo.email,
      loginInfo.password
    );

    expect(authInfo).toBeDefined();
    expect(authRepository.getByEmail).toBeCalledWith(loginInfo.email);
  });

  it('should throw an APIError if no user is found with provided email', async () => {
    jest.spyOn(authRepository, 'getByEmail').mockResolvedValue(null);

    try {
      await clientAuthService.execute(loginInfo.email, loginInfo.password);
    } catch (error) {
      expect(error).toBeInstanceOf(APIError);
      expect((error as APIError).message).toBe('Invalid credentials.');
      expect((error as APIError).status).toBe(401);
    }

    expect.assertions(3);
  });
});
