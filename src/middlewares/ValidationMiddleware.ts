import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

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
    await this.#schema.parse(req.body);

    return next();
  };
}
