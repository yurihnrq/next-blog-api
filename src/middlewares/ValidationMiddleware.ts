import { NextFunction, Request, Response } from 'express';

export class ValidationMiddleware implements APIMiddleware {
  execute = async (
    _req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    return next();
  };
}
