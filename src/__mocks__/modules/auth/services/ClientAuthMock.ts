import { ClientAuthDTO } from '@src/modules/auth/interfaces/ClientAuthDTO';
import { AuthInfo } from '@src/modules/common/interfaces/AuthInfo';
import { ClientAuthService } from '@src/modules/auth/services/interfaces/ClientAuthService';

export class ClientAuthMock implements ClientAuthService {
  execute = async (_data: ClientAuthDTO): Promise<AuthInfo> => {
    return {
      userId: '1',
      authAt: new Date()
    };
  };
}
