import { IGenerateTokenService } from './interfaces/IGenerateTokenService';

export class GenerateTokenService implements IGenerateTokenService {
  execute(_email: string, _password: string): Promise<string> {
    return Promise.resolve('token');
  }
}
