import APIError from '../errors/APIError';
import { TokenProvider } from '../providers/interfaces/TokenProvider';
import { NextFunction, Request, Response } from 'express';
import { IAuthInfo } from '../modules/auth/services/interfaces/IAuthInfo';

export class AuthMiddleware implements APIMiddleware {
  #tokenProvider: TokenProvider;

  constructor(tokenProvider: TokenProvider) {
    this.#tokenProvider = tokenProvider;
  }

  execute = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) throw new APIError(401, 'Unauthorized request.');

    const splitted = token.split(' ')[1];

    const authInfo = await this.#tokenProvider.verifyToken<IAuthInfo>(splitted);

    res.locals.authInfo = authInfo;

    next();
  };
}
