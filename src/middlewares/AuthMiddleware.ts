import APIError from '../errors/APIError';
import { ITokenProvider } from '../providers/interfaces/ITokenProvider';
import { IMiddleware } from '../types/IMiddleware';
import { NextFunction, Request, Response } from 'express';
import { IAuthInfo } from '../modules/auth/services/interfaces/IAuthInfo';

export class AuthMiddleware implements IMiddleware {
  #tokenProvider: ITokenProvider;

  constructor(tokenProvider: ITokenProvider) {
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
