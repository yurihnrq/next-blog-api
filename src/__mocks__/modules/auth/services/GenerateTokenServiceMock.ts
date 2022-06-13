import { IAuthInfo } from '@src/modules/auth/services/interfaces/IAuthInfo';
import { IGenerateTokenService } from '@src/modules/auth/services/interfaces/IGenerateTokenService';

export class GenerateTokenServiceMock implements IGenerateTokenService {
  execute = async (_authInfo: IAuthInfo): Promise<string> => {
    return 'token';
  };
}
