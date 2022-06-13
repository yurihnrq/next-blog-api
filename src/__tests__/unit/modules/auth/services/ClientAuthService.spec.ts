import { IAuthRepository } from '@src/modules/auth/repositories/interfaces/IAuthRepository';
import { ClientAuthService } from '@src/modules/auth/services/ClientAuthService';
import { IAuthInfo } from '@src/modules/auth/services/interfaces/IAuthInfo';
import { IClientAuthService } from '@src/modules/auth/services/interfaces/IClientAuthService';
import { IHashProvider } from '@src/providers/interfaces/IHashProvider';
import APIError from '@src/errors/APIError';
import { HashProviderMock } from '@mocks/providers/HashProviderMock';
import { AuthRepositoryMock } from '@mocks/modules/auth/repositories/AuthRepositoryMock';
import { usersMock } from '@src/__mocks__/modules/users/usersMocks';

const authRepository: IAuthRepository = new AuthRepositoryMock();
const hashProvider: IHashProvider = new HashProviderMock();
const clientAuthService: IClientAuthService = new ClientAuthService(
  authRepository,
  hashProvider
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

  it('should throw an APIError if hashProvider returns false for password comparison', async () => {
    jest.spyOn(hashProvider, 'compareHash').mockResolvedValue(false);

    try {
      await clientAuthService.execute(loginInfo.email, loginInfo.password);
    } catch (error) {
      expect(error).toBeInstanceOf(APIError);
      expect((error as APIError).message).toBe('Invalid credentials.');
      expect((error as APIError).status).toBe(401);
    }

    expect.assertions(3);
  });

  it('should return an IAuthInfo object with fetched user id', async () => {
    const authInfo: IAuthInfo = await clientAuthService.execute(
      loginInfo.email,
      loginInfo.password
    );

    expect(authInfo.userId).toBe(usersMock[0].id);
  });
});
