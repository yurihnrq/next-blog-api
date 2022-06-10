import { IAuthRepository } from '../repositories/interfaces/IAuthRepository';
import { IAuthInfo } from './interfaces/IAuthInfo';
import { IClientAuthService } from './interfaces/IClientAuthService';

export class ClientAuthService implements IClientAuthService {
  #authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this.#authRepository = authRepository;
  }

  execute(email: string, _password: string): Promise<IAuthInfo> {
    this.#authRepository.getByEmail(email);

    return Promise.resolve({
      userId: 'userId',
      authAt: new Date()
    } as IAuthInfo);
  }
}
