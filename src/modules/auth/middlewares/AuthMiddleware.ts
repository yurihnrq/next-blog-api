import APIError from '@src/errors/APIError';
import { IMiddleware } from '@src/types/IMiddleware';
import { NextFunction, Request, Response } from 'express';

export class AuthMiddleware implements IMiddleware {
  execute = async (req: Request, _res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) throw new APIError(401, 'Unauthorized request.');

    next();
  };
}
