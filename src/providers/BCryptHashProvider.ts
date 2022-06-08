import bcrypt from 'bcrypt';
import { IHashProvider } from './interfaces/IHashProvider';

export class BCryptHashProvider implements IHashProvider {
  generateHash = async (payload: string): Promise<string> => {
    return bcrypt.hash(payload, 8);
  };

  compareHash = async (payload: string, hashed: string): Promise<boolean> => {
    return bcrypt.compare(payload, hashed);
  };
}
