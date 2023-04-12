import { z } from 'zod';

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     UserId:
 *       type: string
 *       description: The user ID.
 *       example: 1231231-231-3123123-123123-123123
 */
export const UserIdSchema = z.string({
  invalid_type_error: 'User id must be a string.',
  required_error: 'User id is required.'
});
