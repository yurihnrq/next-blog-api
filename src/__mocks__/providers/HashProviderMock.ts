import { HashProvider } from '@src/providers/interfaces/HashProvider';

export class HashProviderMock implements HashProvider {
  public async generateHash(password: string): Promise<string> {
    return password;
  }

  public async compareHash(_password: string, _hash: string): Promise<boolean> {
    return true;
  }
}
