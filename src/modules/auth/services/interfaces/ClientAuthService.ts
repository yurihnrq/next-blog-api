import { AuthInfo } from './AuthInfo';

export interface ClientAuthService {
  execute(email: string, password: string): Promise<AuthInfo>;
}
