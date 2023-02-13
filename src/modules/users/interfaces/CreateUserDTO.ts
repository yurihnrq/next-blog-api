import { z } from 'zod';
import { UserBiographySchema } from '../schemas/UserBiographySchema';
import { UserBirthDataSchema } from '../schemas/UserBirthDateSchema';
import { EmailSchema } from '../schemas/UserEmailSchema';
import { UserNameSchema } from '../schemas/UserNameSchema';
import { UserPasswordSchema } from '../schemas/UserPasswordSchema';

export const CreateUserSchema = z.object({
  name: UserNameSchema,
  email: EmailSchema,
  password: UserPasswordSchema,
  birthDate: UserBirthDataSchema,
  biography: UserBiographySchema
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
