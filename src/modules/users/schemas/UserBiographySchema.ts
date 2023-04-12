import { z } from 'zod';

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     UserBiography:
 *       type: string
 *       description: The user's biography.
 *       example: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 *       nullable: true
 */
export const UserBiographySchema = z
  .string({
    invalid_type_error: 'Biography must be a string.'
  })
  .nullable();
