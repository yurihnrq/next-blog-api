import { ITokenProvider } from '@src/providers/interfaces/ITokenProvider';

export class TokenProviderMock implements ITokenProvider {
  generateToken<T extends object>(_payload: T): string {
    return 'mocked-token';
  }
  verifyToken<T extends object>(_token: string): T {
    return {} as T;
  }
}
