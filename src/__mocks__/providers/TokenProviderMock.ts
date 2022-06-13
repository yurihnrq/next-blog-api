import { ITokenProvider } from '@src/providers/interfaces/ITokenProvider';

export class TokenProviderMock implements ITokenProvider {
  generateToken = async <T extends object>(_payload: T): Promise<string> => {
    return 'mocked-token';
  };

  verifyToken = async <T extends object>(_token: string): Promise<T> => {
    return {} as T;
  };
}
