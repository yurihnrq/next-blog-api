import { GenerateTokenService } from '@src/modules/auth/services/GenerateTokenService';
import { IGenerateTokenService } from '@src/modules/auth/services/interfaces/IGenerateTokenService';

const generateTokenService: IGenerateTokenService = new GenerateTokenService();

const testId = 'test-id';

describe('GenerateTokenService', () => {
  it('should return a token', async () => {
    const token = await generateTokenService.execute(testId);

    expect(token).toBeDefined();
    expect(token).toBe('token');
  });
});
