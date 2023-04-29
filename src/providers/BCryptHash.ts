import bcrypt from 'bcrypt';
import { HashProvider } from './interfaces/HashProvider';

/**
 * Hash provider using the bcrypt library.
 *
 * @see {@link https://www.npmjs.com/package/bcrypt}
 *
 * @example
 * const hashProvider: HashProvider = new BCryptHash();
 */
export class BCryptHash implements HashProvider {
  generateHash = async (payload: string): Promise<string> => {
    return bcrypt.hash(payload, 8);
  };

  compareHash = async (payload: string, hashed: string): Promise<boolean> => {
    return bcrypt.compare(payload, hashed);
  };
}
