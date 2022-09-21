import { NextFunction, Request, Response } from 'express';

import APIError from '../errors/APIError';

export class ExceptionMiddleware implements IErrorMiddleware {
  execute = async (
    err: APIError,
    _req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<Response> => {
    if (!(err instanceof APIError)) {
      err = new APIError(500, 'Server Internal Error, try again.');
    }

    return res.status(err.status).json({
      success: false,
      message: 'An error has occurred.',
      data: err
    });
  };
}
