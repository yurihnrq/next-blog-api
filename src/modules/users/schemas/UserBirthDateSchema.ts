import { z } from 'zod';

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     UserBirthDate:
 *       type: string
 *       description: The user's birth date.
 *       example: 1990-01-01
 */
export const UserBirthDateSchema = z.union([
  z.date({
    required_error: 'Birth date is required.',
    invalid_type_error: 'Birth date must be a date or a string.'
  }),
  z.string({
    required_error: 'Birth date is required.',
    invalid_type_error: 'Birth date must be a date or a string.'
  })
]);
