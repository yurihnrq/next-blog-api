import { AuthRepository } from '@src/modules/auth/repositories/interfaces/AuthRepository';
import { ClientAuth } from '@src/modules/auth/services/ClientAuth';
import { AuthInfo } from '@src/modules/auth/services/interfaces/AuthInfo';
import { ClientAuthService } from '@src/modules/auth/services/interfaces/ClientAuthService';
import { HashProvider } from '@src/providers/interfaces/HashProvider';
import APIError from '@src/errors/APIError';
import { HashProviderMock } from '@mocks/providers/HashProviderMock';
import { AuthRepositoryMock } from '@mocks/modules/auth/repositories/AuthRepositoryMock';
import { usersMock } from '@src/__mocks__/modules/users/usersMocks';

const authRepository: AuthRepository = new AuthRepositoryMock();
const hashProvider: HashProvider = new HashProviderMock();
const clientAuthService: ClientAuthService = new ClientAuth(
  authRepository,
  hashProvider
);

const loginInfo = {
  email: 'test@mail.com',
  password: 'test-password'
};

describe('ClientAuth', () => {
  it('should return an AuthInfo object', async () => {
    const authInfo: AuthInfo = await clientAuthService.execute({
      email: loginInfo.email,
      password: loginInfo.password
    });

    expect(authInfo).toBeDefined();
  });

  it('should return an AuthInfo object only if fetch a user with provided email from repository', async () => {
    jest.spyOn(authRepository, 'getUserByEmail');

    const authInfo: AuthInfo = await clientAuthService.execute({
      email: loginInfo.email,
      password: loginInfo.password
    });

    expect(authInfo).toBeDefined();
    expect(authRepository.getUserByEmail).toBeCalledWith(loginInfo.email);
  });

  it('should throw an APIError if no user is found with provided email', async () => {
    jest.spyOn(authRepository, 'getUserByEmail').mockResolvedValue(null);

    try {
      await clientAuthService.execute({
        email: loginInfo.email,
        password: loginInfo.password
      });
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
      await clientAuthService.execute({
        email: loginInfo.email,
        password: loginInfo.password
      });
    } catch (error) {
      expect(error).toBeInstanceOf(APIError);
      expect((error as APIError).message).toBe('Invalid credentials.');
      expect((error as APIError).status).toBe(401);
    }

    expect.assertions(3);
  });

  it('should return an AuthInfo object with fetched user id', async () => {
    const authInfo: AuthInfo = await clientAuthService.execute({
      email: loginInfo.email,
      password: loginInfo.password
    });

    expect(authInfo.userId).toBe(usersMock[0].id);
  });
});
