import { IAuthRepository } from '@src/modules/auth/repositories/interfaces/IAuthRepository';
import { GenerateTokenService } from '@src/modules/auth/services/GenerateTokenService';
import { IGenerateTokenService } from '@src/modules/auth/services/interfaces/IGenerateTokenService';
import { AuthRepositoryMock } from '@mocks/modules/auth/repositories/AuthRepositoryMock';

const authRepository: IAuthRepository = new AuthRepositoryMock();
const generateTokenService: IGenerateTokenService = new GenerateTokenService(
  authRepository
);

describe('GenerateTokenService', () => {
  it('should return a token', async () => {
    const token = await generateTokenService.execute(
      'test@mail.com',
      'test-password'
    );

    expect(token).toBeDefined();
    expect(token).toBe('token');
  });

  it('should return a token after fetch a valid user with provided email', async () => {
    jest.spyOn(authRepository, 'getByEmail');

    const token = await generateTokenService.execute(
      'test@mail.com',
      'test-password'
    );

    expect(token).toBeDefined();
    expect(token).toBe('token');
    expect(authRepository.getByEmail).toHaveBeenCalledWith('test@mail.com');
  });
});
