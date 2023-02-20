import { AuthInfo } from '@src/modules/common/interfaces/AuthInfo';
import { GenerateTokenService } from '@src/modules/auth/services/interfaces/GenerateTokenService';

export class GenerateTokenMock implements GenerateTokenService {
  execute = async (_authInfo: AuthInfo): Promise<string> => {
    return 'token';
  };
}
