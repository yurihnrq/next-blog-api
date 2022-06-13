import { IMiddleware } from '@src/types/IMiddleware';
import { NextFunction, Request, Response } from 'express';

export class AuthMiddleware implements IMiddleware {
  execute = async (_req: Request, _res: Response, next: NextFunction) => {
    next();
  };
}
