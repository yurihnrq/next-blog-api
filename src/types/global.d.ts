import { Request, Response, NextFunction } from 'express';
import { Send } from 'express-serve-static-core';

declare global {
  /**
   * @swagger
   *
   * components:
   *   schemas:
   *     APIResponse:
   *       type: object
   *       properties:
   *         success:
   *           type: boolean
   *           description: Whether the request was successful or not.
   *         message:
   *           type: string
   *           description: The message returned by the server.
   *         data:
   *           type: object
   *           description: The data returned by the server.
   *           nullable: true
   */
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

  /**
   * @swagger
   *
   * components:
   *   schemas:
   *     PaginatedAPIResponse:
   *       type: object
   *       properties:
   *         success:
   *           $ref: '#/components/schemas/APIResponse/properties/success'
   *         message:
   *           $ref: '#/components/schemas/APIResponse/properties/message'
   *         data:
   *           type: object
   *           properties:
   *             count:
   *               type: number
   *               description: The total number of results.
   *               example: 1
   *             totalPages:
   *               type: number
   *               description: The total number of pages.
   *               example: 1
   *             currentPage:
   *               type: number
   *               description: The current page.
   *               example: 1
   *             pageSize:
   *               type: number
   *               description: The number of results per page.
   *               example: 10
   *             results:
   *               type: array
   *               description: The results.
   *               items:
   *                 type: object
   *                 description: The result item.
   */
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
