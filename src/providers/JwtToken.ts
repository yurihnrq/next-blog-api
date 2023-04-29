import jwt from 'jsonwebtoken';

import { TokenProvider } from './interfaces/TokenProvider';

/**
 * Token provider using the JWT library.
 *
 * @see {@link https://www.npmjs.com/package/jsonwebtoken}
 *
 * @example
 * const tokenProvider: TokenProvider = new JwtToken('my-secret');
 */
export class JwtToken implements TokenProvider {
  #secret: string;

  /**
   * Creates a new JWT token provider.
   *
   * @param {string} secret The secret used to sign the token.
   */
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
