import { z } from 'zod';

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     UserName:
 *       type: string
 *       description: The user's name.
 *       example: John Doe
 */
export const UserNameSchema = z
  .string({
    required_error: 'Name is required.',
    invalid_type_error: 'Name must be a string.'
  })
  .min(3, {
    message: 'Name must have at least 3 characters.'
  })
  .max(255, {
    message: 'Name must have less than 255 characters.'
  });
