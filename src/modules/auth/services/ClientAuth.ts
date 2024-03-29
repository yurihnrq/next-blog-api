import APIError from '@src/errors/APIError';
import { HashProvider } from '@src/providers/interfaces/HashProvider';
import { ClientAuthDTO } from '../interfaces/ClientAuthDTO';
import { AuthRepository } from '../repositories/interfaces/AuthRepository';
import { AuthInfo } from '../../common/interfaces/AuthInfo';
import { ClientAuthService } from './interfaces/ClientAuthService';

export class ClientAuth implements ClientAuthService {
  #authRepository: AuthRepository;
  #hashProvider: HashProvider;

  constructor(authRepository: AuthRepository, hashProvider: HashProvider) {
    this.#authRepository = authRepository;
    this.#hashProvider = hashProvider;
  }

  execute = async (data: ClientAuthDTO): Promise<AuthInfo> => {
    const existentUser = await this.#authRepository.getUserByEmail(data.email);

    if (!existentUser) throw new APIError(401, 'Invalid credentials.');

    const isPasswordValid = await this.#hashProvider.compareHash(
      data.password,
      existentUser.password
    );

    if (!isPasswordValid) throw new APIError(401, 'Invalid credentials.');

    return {
      userId: existentUser.id,
      authAt: new Date()
    };
  };
}
