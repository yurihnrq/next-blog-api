import { Request, Response, NextFunction } from 'express';
import { Send } from 'express-serve-static-core';

declare global {
  interface APIResponse<T = unknown> extends Response {
    json: Send<
      {
        success: boolean;
        message: string;
        data: T;
      },
      this
    >;
  }

  interface PaginatedResults<T = unknown> {
    count: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    results: T[];
  }

  type PaginatedAPIResponse<T = unknown> = APIResponse<PaginatedResults<T>>;

  interface APIController {
    execute: (req: Request, res: APIResponse) => Promise<Response>;
  }

  interface APIMiddleware {
    execute: (
      req: Request,
      res: APIResponse,
      next: NextFunction
    ) => Promise<void>;
  }

  interface APIErrorMiddleware extends APIMiddleware {
    execute: (
      err: Error,
      req: Request,
      res: APIResponse,
      next: NextFunction
    ) => Promise<Response>;
  }
}
