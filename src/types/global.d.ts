import { Request, Response, NextFunction } from 'express';
import { Send } from 'express-serve-static-core';

declare global {
  interface IResponse<T = unknown> extends Response {
    json: Send<
      {
        success: boolean;
        message: string;
        data: T;
      },
      this
    >;
  }

  interface IController {
    execute: (req: Request, res: IResponse) => Promise<Response>;
  }

  interface IMiddleware {
    execute: (
      req: Request,
      res: IResponse,
      next: NextFunction
    ) => Promise<void>;
  }
}
