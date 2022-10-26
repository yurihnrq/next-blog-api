import APIError from '@src/errors/APIError';
import { HashProvider } from '@src/providers/interfaces/HashProvider';
import { IAuthRepository } from '../repositories/interfaces/IAuthRepository';
import { AuthInfo } from './interfaces/AuthInfo';
import { ClientAuthService } from './interfaces/ClientAuthService';

export class ClientAuth implements ClientAuthService {
  #authRepository: IAuthRepository;
  #hashProvider: HashProvider;

  constructor(authRepository: IAuthRepository, hashProvider: HashProvider) {
    this.#authRepository = authRepository;
    this.#hashProvider = hashProvider;
  }

  execute = async (email: string, password: string): Promise<AuthInfo> => {
    const existentUser = await this.#authRepository.getByEmail(email);

    if (!existentUser) throw new APIError(401, 'Invalid credentials.');

    const isPasswordValid = await this.#hashProvider.compareHash(
      password,
      existentUser.password
    );

    if (!isPasswordValid) throw new APIError(401, 'Invalid credentials.');

    return {
      userId: existentUser.id as string,
      authAt: new Date()
    };
  };
}
