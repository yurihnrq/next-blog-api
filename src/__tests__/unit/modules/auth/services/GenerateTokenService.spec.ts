import { GenerateTokenService } from '@src/modules/auth/services/GenerateTokenService';
import { IGenerateTokenService } from '@src/modules/auth/services/interfaces/IGenerateTokenService';

const generateTokenService: IGenerateTokenService = new GenerateTokenService();

describe('GenerateTokenService', () => {
  it('should return a token', async () => {
    const token = await generateTokenService.execute(
      'test@mail.com',
      'test-password'
    );

    expect(token).toBeDefined();
  });
});
