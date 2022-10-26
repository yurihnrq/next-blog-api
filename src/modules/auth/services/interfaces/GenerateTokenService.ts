import { AuthInfo } from './AuthInfo';

export interface GenerateTokenService {
  execute(authInfo: AuthInfo): Promise<string>;
}
