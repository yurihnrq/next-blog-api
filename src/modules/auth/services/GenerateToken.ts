import { TokenProvider } from '@src/providers/interfaces/TokenProvider';
import { AuthInfo } from '../../common/interfaces/AuthInfo';
import { GenerateTokenService } from './interfaces/GenerateTokenService';

export class GenerateToken implements GenerateTokenService {
  #tokenProvider: TokenProvider;

  constructor(tokenProvider: TokenProvider) {
    this.#tokenProvider = tokenProvider;
  }

  execute = async (authInfo: AuthInfo): Promise<string> => {
    const token = this.#tokenProvider.generateToken<AuthInfo>(authInfo);

    return token;
  };
}
