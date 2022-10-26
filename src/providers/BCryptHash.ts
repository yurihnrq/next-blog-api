import bcrypt from 'bcrypt';
import { HashProvider } from './interfaces/HashProvider';

export class BCryptHash implements HashProvider {
  generateHash = async (payload: string): Promise<string> => {
    return bcrypt.hash(payload, 8);
  };

  compareHash = async (payload: string, hashed: string): Promise<boolean> => {
    return bcrypt.compare(payload, hashed);
  };
}
