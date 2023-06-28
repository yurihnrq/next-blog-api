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

  /**
   * Interface for API controllers.
   *
   * A controller is a class responsible for handling a request and returning a response.
   */
  interface APIController {
    /**
     * Execute the controller.
     *
     * @param {Request} req The request object.
     * @param {Response} res The response object.
     * @returns {Promise<Response>} A Promise that resolves to a Response object.
     */
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
