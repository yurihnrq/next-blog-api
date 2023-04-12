import { z } from 'zod';

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     UserPassword:
 *       type: string
 *       description: The user's password.
 *       example: 12345678
 */
export const UserPasswordSchema = z
  .string({
    required_error: 'Password is required.',
    invalid_type_error: 'Password must be a string.'
  })
  .min(8, {
    message: 'Password must have at least 8 characters.'
  })
  .max(32, {
    message: 'Password must have less than 32 characters.'
  });
