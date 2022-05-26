import { User } from '@prisma/client';
import { Middleware } from '../../types';

export const validateUserInfo: Middleware = async (req, res, next) => {
  const { name, email, password, biography, birthDate } = req.body as User;

  if (!name || !email || !password || !birthDate) {
    return res.status(400).json({
      message: 'Please provide all required fields'
    });
  }

  if (name.length < 3 || name.length > 254) {
    return res.status(400).json({
      message: 'Name must be between 3 and 254 characters'
    });
  }

  if (email.length < 5 || email.length > 60) {
    return res.status(400).json({
      message: 'Email must be between 5 and 60 characters'
    });
  }

  if (password.length < 8 || password.length > 60) {
    return res.status(400).json({
      message: 'Password must be between 8 and 60 characters'
    });
  }

  if (biography && biography.length > 400) {
    return res.status(400).json({
      message: 'Biography must be less than 400 characters'
    });
  }

  next();
};
