import APIError from '@src/errors/APIError';
import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodSchema } from 'zod';

export class ValidationMiddleware implements APIMiddleware {
  #schema: ZodSchema;

  constructor(schema: ZodSchema) {
    this.#schema = schema;
  }

  execute = async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      this.#schema.parse(req.body);
    } catch (error) {
      const zodError = error as ZodError;
      throw new APIError(400, zodError.errors[0].message);
    }

    return next();
  };
}
