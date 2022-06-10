import { IAuthInfo } from './IAuthInfo';

export interface IGenerateTokenService {
  execute(authInfo: IAuthInfo): Promise<string>;
}
