import { IAuthInfo } from '@src/modules/auth/services/interfaces/IAuthInfo';
import { IClientAuthService } from '@src/modules/auth/services/interfaces/IClientAuthService';

export class ClientAuthServiceMock implements IClientAuthService {
  execute = async (_email: string, _password: string): Promise<IAuthInfo> => {
    return {
      userId: '1',
      authAt: new Date()
    };
  };
}
