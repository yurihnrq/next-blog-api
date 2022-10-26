import { AuthInfo } from '@src/modules/auth/services/interfaces/AuthInfo';
import { ClientAuthService } from '@src/modules/auth/services/interfaces/ClientAuthService';

export class ClientAuthMock implements ClientAuthService {
  execute = async (_email: string, _password: string): Promise<AuthInfo> => {
    return {
      userId: '1',
      authAt: new Date()
    };
  };
}
