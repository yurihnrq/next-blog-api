import { IHashProvider } from '@src/providers/interfaces/IHashProvider';

export class HashProviderMock implements IHashProvider {
  public async generateHash(password: string): Promise<string> {
    return password;
  }

  public async compareHash(_password: string, _hash: string): Promise<boolean> {
    return true;
  }
}
