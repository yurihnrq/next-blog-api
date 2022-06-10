import { IAuthRepository } from '@src/modules/auth/repositories/interfaces/IAuthRepository';
import { ClientAuthService } from '@src/modules/auth/services/ClientAuthService';
import { IAuthInfo } from '@src/modules/auth/services/interfaces/IAuthInfo';
import { IClientAuthService } from '@src/modules/auth/services/interfaces/IClientAuthService';
import { AuthRepositoryMock } from '@mocks/modules/auth/repositories/AuthRepositoryMock';

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
});
