import APIError from '@src/errors/APIError';
import { IAuthRepository } from '../repositories/interfaces/IAuthRepository';
import { IGenerateTokenService } from './interfaces/IGenerateTokenService';

export class GenerateTokenService implements IGenerateTokenService {
  #authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this.#authRepository = authRepository;
  }

  execute(email: string, _password: string): Promise<string> {
    const user = this.#authRepository.getByEmail(email);

    if (!user) throw new APIError(404, 'User with provided email not found.');

    return Promise.resolve('token');
  }
}
