import { GenerateTokenService } from '@src/modules/auth/services/GenerateTokenService';
import { IGenerateTokenService } from '@src/modules/auth/services/interfaces/IGenerateTokenService';
import { ITokenProvider } from '@src/providers/interfaces/ITokenProvider';
import { TokenProviderMock } from '@mocks/providers/TokenProviderMock';
import { IAuthInfo } from '@src/modules/auth/services/interfaces/IAuthInfo';

const tokenProvider: ITokenProvider = new TokenProviderMock();
const generateTokenService: IGenerateTokenService = new GenerateTokenService(
  tokenProvider
);

const testId = 'test-id';

describe('GenerateTokenService', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('10/06/2022'));
  });

  it('should return a token', async () => {
    const token = await generateTokenService.execute(testId);

    expect(token).toBeDefined();
  });

  it('should call tokenProvider to generate a token with IAuthInfo object as payload', async () => {
    jest.spyOn(tokenProvider, 'generateToken');

    await generateTokenService.execute(testId);

    const authInfo: IAuthInfo = {
      userId: testId,
      authAt: new Date()
    };

    expect(tokenProvider.generateToken).toHaveBeenCalledWith(authInfo);
  });
});
