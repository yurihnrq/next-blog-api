import { z } from 'zod';
import { UserBiographySchema } from '../schemas/UserBiographySchema';
import { UserBirthDateSchema } from '../schemas/UserBirthDateSchema';
import { UserNameSchema } from '../schemas/UserNameSchema';
import { UserEmailSchema } from '@src/modules/common/schemas/UserEmailSchema';
import { UserPasswordSchema } from '@src/modules/common/schemas/UserPasswordSchema';

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     CreateUserDTO:
 *       type: object
 *       properties:
 *         name:
 *           $ref: '#/components/schemas/UserName'
 *         email:
 *           $ref: '#/components/schemas/UserEmail'
 *         password:
 *           $ref: '#/components/schemas/UserPassword'
 *         birthDate:
 *           $ref: '#/components/schemas/UserBirthDate'
 *         biography:
 *           $ref: '#/components/schemas/UserBiography'
 */
export const CreateUserSchema = z.object({
  name: UserNameSchema,
  email: UserEmailSchema,
  password: UserPasswordSchema,
  birthDate: UserBirthDateSchema,
  biography: UserBiographySchema
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
