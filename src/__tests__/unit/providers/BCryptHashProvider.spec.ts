import { BCryptHashProvider } from '@src/providers/BCryptHashProvider';
import { IHashProvider } from '@src/providers/interfaces/IHashProvider';
import bcrypt from 'bcrypt';

describe('BCryptHashProvider', () => {
  const provider: IHashProvider = new BCryptHashProvider();

  it('should generate a hash', async () => {
    jest.spyOn(bcrypt, 'hash');

    await provider.generateHash('123456');

    expect(bcrypt.hash).toHaveBeenCalledWith('123456', 8);
  });

  it('should return true for valid comparison', async () => {
    jest.spyOn(bcrypt, 'compare');
    const hash = await provider.generateHash('123456');

    const res = await provider.compareHash('123456', hash);

    expect(res).toBeTruthy();
    expect(bcrypt.compare).toHaveBeenCalledWith('123456', hash);
  });

  it('should return false for invalid comparison', async () => {
    jest.spyOn(bcrypt, 'compare');
    const hash = 'invalid-hash';

    const res = await provider.compareHash('123456', hash);

    expect(res).toBeFalsy();
    expect(bcrypt.compare).toHaveBeenCalledWith('123456', hash);
  });
});
