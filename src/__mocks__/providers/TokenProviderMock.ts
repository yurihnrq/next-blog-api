import { TokenProvider } from '@src/providers/interfaces/TokenProvider';

export class TokenProviderMock implements TokenProvider {
  generateToken = async <T extends object>(_payload: T): Promise<string> => {
    return 'mocked-token';
  };

  verifyToken = async <T extends object>(_token: string): Promise<T> => {
    return {} as T;
  };
}
