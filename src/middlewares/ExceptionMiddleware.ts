import { NextFunction, Request, Response } from 'express';

import APIError from '../errors/APIError';

export class ExceptionMiddleware implements IErrorMiddleware {
  execute = async (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<Response> => {
    let returnedError: APIError;

    if (err instanceof APIError) {
      returnedError = err;
    } else {
      returnedError = new APIError(500, 'Server Internal Error, try again.');
    }

    console.error(err);

    return res.status(returnedError.status).json({
      success: false,
      message: returnedError.message,
      data: null
    });
  };
}
