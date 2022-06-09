import { NextFunction, Request, Response } from 'express';
import { IMiddleware } from '../../../types/IMiddleware';
import APIError from '../../../models/APIError';
import { IUser } from '../services/interfaces/IUser';

export class UserInfoValidation implements IMiddleware {
  execute = async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { name, email, password, biography, birthDate } = req.body as IUser;

    if (!name || !email || !password || !birthDate)
      throw new APIError(400, 'Missing required fields.');

    if (name.length < 3 || name.length > 254)
      throw new APIError(400, 'Name must be between 3 and 254 characters.');

    if (email.length < 5 || email.length > 60)
      throw new APIError(400, 'Email must be between 5 and 60 characters.');

    if (password.length < 8 || password.length > 60)
      throw new APIError(400, 'Password must be between 8 and 60 characters.');

    if (biography && biography.length > 400)
      throw new APIError(400, 'Biography must be less than 400 characters.');

    return next();
  };
}
