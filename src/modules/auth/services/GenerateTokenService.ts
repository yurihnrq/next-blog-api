import { IGenerateTokenService } from './interfaces/IGenerateTokenService';

export class GenerateTokenService implements IGenerateTokenService {
  execute(_userId: string): Promise<string> {
    return Promise.resolve('token');
  }
}
