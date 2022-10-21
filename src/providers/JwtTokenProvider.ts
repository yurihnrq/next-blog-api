import jwt from 'jsonwebtoken';

import { TokenProvider } from './interfaces/TokenProvider';

export class JwtTokenProvider implements TokenProvider {
  #secret: string;

  constructor(secret: string) {
    this.#secret = secret;
  }

  generateToken = async <T extends object>(payload: T): Promise<string> => {
    return jwt.sign(payload as T, this.#secret, { expiresIn: '1h' });
  };

  verifyToken = async <T extends object>(token: string): Promise<T> => {
    return jwt.verify(token, this.#secret) as T;
  };
}
