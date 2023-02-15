import { z } from 'zod';

export const UserPasswordSchema = z
  .string({
    required_error: 'Password is required.'
  })
  .min(8, {
    message: 'Password must have at least 8 characters.'
  })
  .max(32, {
    message: 'Password must have less than 32 characters.'
  });
