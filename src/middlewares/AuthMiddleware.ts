import APIError from '../errors/APIError';
import { TokenProvider } from '../providers/interfaces/TokenProvider';
import { NextFunction, Request, Response } from 'express';
import { AuthInfo } from '../modules/common/interfaces/AuthInfo';

export class AuthMiddleware implements APIMiddleware {
  #tokenProvider: TokenProvider;

  constructor(tokenProvider: TokenProvider) {
    this.#tokenProvider = tokenProvider;
  }

  execute = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) throw new APIError(401, 'Unauthorized request.');

    const splitted = token.split(' ')[1];

    try {
      const authInfo = await this.#tokenProvider.verifyToken<AuthInfo>(
        splitted
      );

      res.locals.authInfo = authInfo;
    } catch {
      throw new APIError(401, 'Unauthorized request.');
    }

    next();
  };
}
