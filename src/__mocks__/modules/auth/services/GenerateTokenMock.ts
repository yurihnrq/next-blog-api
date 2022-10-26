import { AuthInfo } from '@src/modules/auth/services/interfaces/AuthInfo';
import { GenerateTokenService } from '@src/modules/auth/services/interfaces/GenerateTokenService';

export class GenerateTokenMock implements GenerateTokenService {
  execute = async (_authInfo: AuthInfo): Promise<string> => {
    return 'token';
  };
}
