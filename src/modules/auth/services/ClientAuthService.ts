import APIError from '@src/errors/APIError';
import { IAuthRepository } from '../repositories/interfaces/IAuthRepository';
import { IAuthInfo } from './interfaces/IAuthInfo';
import { IClientAuthService } from './interfaces/IClientAuthService';

export class ClientAuthService implements IClientAuthService {
  #authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this.#authRepository = authRepository;
  }

  execute = async (email: string, _password: string): Promise<IAuthInfo> => {
    const existentUser = await this.#authRepository.getByEmail(email);

    if (!existentUser) throw new APIError(401, 'Invalid credentials.');

    return Promise.resolve({
      userId: 'userId',
      authAt: new Date()
    } as IAuthInfo);
  };
}
