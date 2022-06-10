import { IAuthInfo } from './IAuthInfo';

export interface IClientAuthService {
  execute(email: string, password: string): Promise<IAuthInfo>;
}
