import { TokenProvider } from '@src/providers/interfaces/TokenProvider';
import { IAuthInfo } from './interfaces/IAuthInfo';
import { IGenerateTokenService } from './interfaces/IGenerateTokenService';

export class GenerateTokenService implements IGenerateTokenService {
  #tokenProvider: TokenProvider;

  constructor(tokenProvider: TokenProvider) {
    this.#tokenProvider = tokenProvider;
  }

  execute = async (authInfo: IAuthInfo): Promise<string> => {
    const token = this.#tokenProvider.generateToken<IAuthInfo>(authInfo);

    return token;
  };
}
