import { NextFunction, Request, Response } from 'express';

export interface IMiddleware {
  execute: (req: Request, _res: Response, next: NextFunction) => Promise<void>;
}
