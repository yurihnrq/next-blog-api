import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

export const validateUserInfo = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, biography, birthDate } = req.body as User;

  if (!name || !email || !password || !birthDate) {
    res.status(400).json({
      message: 'Please provide all required fields'
    });

    return;
  }

  if (name.length < 3 || name.length > 254) {
    res.status(400).json({
      message: 'Name must be between 3 and 254 characters'
    });

    return;
  }

  if (email.length < 5 || email.length > 60) {
    res.status(400).json({
      message: 'Email must be between 5 and 60 characters'
    });

    return;
  }

  if (password.length < 8 || password.length > 60) {
    res.status(400).json({
      message: 'Password must be between 8 and 60 characters'
    });

    return;
  }

  if (biography && biography.length > 400) {
    res.status(400).json({
      message: 'Biography must be less than 400 characters'
    });

    return;
  }

  next();
};
