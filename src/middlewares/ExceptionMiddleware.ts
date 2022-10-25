import { NextFunction, Request, Response } from 'express';

import APIError from '../errors/APIError';

export class ExceptionMiddleware implements APIErrorMiddleware {
  execute = async (
    err: Error,
    _req: Request,
    res: APIResponse,
    _next: NextFunction
  ): Promise<Response> => {
    let returnedError: APIError;

    if (err instanceof APIError) {
      returnedError = err;
    } else {
      returnedError = new APIError(500, 'Server Internal Error, try again.');
    }

    if (process.env.NODE_ENV !== 'test') console.error(err);

    return res.status(returnedError.status).json({
      success: false,
      message: returnedError.message,
      data: null
    });
  };
}
