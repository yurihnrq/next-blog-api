import { GenerateTokenService } from '@src/modules/auth/services/GenerateTokenService';
import { IGenerateTokenService } from '@src/modules/auth/services/interfaces/IGenerateTokenService';
import { ITokenProvider } from '@src/providers/interfaces/ITokenProvider';
import { TokenProviderMock } from '@mocks/providers/TokenProviderMock';
import { IAuthInfo } from '@src/modules/auth/services/interfaces/IAuthInfo';

const tokenProvider: ITokenProvider = new TokenProviderMock();
const generateTokenService: IGenerateTokenService = new GenerateTokenService(
  tokenProvider
);

const authInfo: IAuthInfo = {
  userId: 'test-id',
  authAt: new Date()
};

describe('GenerateTokenService', () => {
  it('should return a token', async () => {
    const token = await generateTokenService.execute(authInfo);

    expect(token).toBeDefined();
  });

  it('should call tokenProvider to generate a token with IAuthInfo object as payload', async () => {
    jest.spyOn(tokenProvider, 'generateToken');

    await generateTokenService.execute(authInfo);

    expect(tokenProvider.generateToken).toHaveBeenCalledWith(authInfo);
  });
});
