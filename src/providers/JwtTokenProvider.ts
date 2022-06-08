import jwt from 'jsonwebtoken';

import { ITokenProvider } from './interfaces/ITokenProvider';

export class JwtTokenProvider implements ITokenProvider {
  #secret: string;

  constructor(secret: string) {
    this.#secret = secret;
  }

  generateToken = <T extends object>(payload: T): string => {
    return jwt.sign(payload as object, this.#secret, { expiresIn: '1h' });
  };

  verifyToken = <T extends object>(token: string): T => {
    return jwt.verify(token, this.#secret) as T;
  };
}
