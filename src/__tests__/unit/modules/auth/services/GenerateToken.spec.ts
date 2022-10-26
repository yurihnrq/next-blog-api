import { GenerateToken } from '@src/modules/auth/services/GenerateTokenService';
import { GenerateTokenService } from '@src/modules/auth/services/interfaces/GenerateTokenService';
import { TokenProvider } from '@src/providers/interfaces/TokenProvider';
import { TokenProviderMock } from '@mocks/providers/TokenProviderMock';
import { AuthInfo } from '@src/modules/auth/services/interfaces/AuthInfo';

const tokenProvider: TokenProvider = new TokenProviderMock();
const generateTokenService: GenerateTokenService = new GenerateToken(
  tokenProvider
);

const authInfo: AuthInfo = {
  userId: 'test-id',
  authAt: new Date()
};

describe('GenerateToken', () => {
  it('should return a token', async () => {
    const token = await generateTokenService.execute(authInfo);

    expect(token).toBeDefined();
  });

  it('should call tokenProvider to generate a token with AuthInfo object as payload', async () => {
    jest.spyOn(tokenProvider, 'generateToken');

    await generateTokenService.execute(authInfo);

    expect(tokenProvider.generateToken).toHaveBeenCalledWith(authInfo);
  });
});
