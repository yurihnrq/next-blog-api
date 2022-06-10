import { ITokenProvider } from '@src/providers/interfaces/ITokenProvider';
import { IAuthInfo } from './interfaces/IAuthInfo';
import { IGenerateTokenService } from './interfaces/IGenerateTokenService';

export class GenerateTokenService implements IGenerateTokenService {
  #tokenProvider: ITokenProvider;

  constructor(tokenProvider: ITokenProvider) {
    this.#tokenProvider = tokenProvider;
  }

  execute = async (userId: string): Promise<string> => {
    const token = this.#tokenProvider.generateToken<IAuthInfo>({
      userId,
      authAt: new Date()
    });

    return token;
  };
}
