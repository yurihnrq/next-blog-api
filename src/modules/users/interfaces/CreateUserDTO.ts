import { z } from 'zod';
import { UserBiographySchema } from '../schemas/UserBiographySchema';
import { UserBirthDateSchema } from '../schemas/UserBirthDateSchema';
import { UserNameSchema } from '../schemas/UserNameSchema';
import { UserEmailSchema } from '@src/modules/common/schemas/UserEmailSchema';
import { UserPasswordSchema } from '@src/modules/common/schemas/UserPasswordSchema';

export const CreateUserSchema = z.object({
  name: UserNameSchema,
  email: UserEmailSchema,
  password: UserPasswordSchema,
  birthDate: UserBirthDateSchema,
  biography: UserBiographySchema
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
