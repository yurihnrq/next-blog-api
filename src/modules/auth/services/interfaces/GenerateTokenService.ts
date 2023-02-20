import { AuthInfo } from '../../../common/interfaces/AuthInfo';

export interface GenerateTokenService {
  execute(authInfo: AuthInfo): Promise<string>;
}
