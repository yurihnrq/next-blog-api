import APIError from '@src/errors/APIError';
import { ITokenProvider } from '@src/providers/interfaces/ITokenProvider';
import { IMiddleware } from '@src/types/IMiddleware';
import { NextFunction, Request, Response } from 'express';

export class AuthMiddleware implements IMiddleware {
  #tokenProvider: ITokenProvider;

  constructor(tokenProvider: ITokenProvider) {
    this.#tokenProvider = tokenProvider;
  }

  execute = async (req: Request, _res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) throw new APIError(401, 'Unauthorized request.');

    const splitted = token.split(' ')[1];

    this.#tokenProvider.verifyToken(splitted);

    next();
  };
}
