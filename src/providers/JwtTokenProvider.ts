import jwt from 'jsonwebtoken';

import { ITokenProvider } from './interfaces/ITokenProvider';

export class JwtTokenProvider implements ITokenProvider {
  #secret: string;

  constructor(secret: string) {
    this.#secret = secret;
  }

  generateToken = async <T extends object>(payload: T): Promise<string> => {
    return jwt.sign(payload as object, this.#secret, { expiresIn: '1h' });
  };

  verifyToken = async <T extends object>(token: string): Promise<T> => {
    return jwt.verify(token, this.#secret) as T;
  };
}
