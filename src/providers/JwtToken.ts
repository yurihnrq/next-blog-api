import jwt from 'jsonwebtoken';

import { TokenProvider } from './interfaces/TokenProvider';

export class JwtToken implements TokenProvider {
  #secret: string;

  constructor(secret: string) {
    this.#secret = secret;
  }

  generateToken = async <T extends object>(payload: T): Promise<string> => {
    return jwt.sign(payload, this.#secret, { expiresIn: '7d' });
  };

  verifyToken = async <T extends object>(token: string): Promise<T> => {
    return jwt.verify(token, this.#secret) as T;
  };
}
