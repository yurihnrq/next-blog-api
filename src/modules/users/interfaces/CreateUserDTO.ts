import { z } from 'zod';
import { UserBiographySchema } from '../schemas/UserBiographySchema';
import { UserBirthDateSchema } from '../schemas/UserBirthDateSchema';
import { EmailSchema } from '../schemas/UserEmailSchema';
import { UserNameSchema } from '../schemas/UserNameSchema';
import { UserPasswordSchema } from '../schemas/UserPasswordSchema';

export const CreateUserSchema = z.object({
  name: UserNameSchema,
  email: EmailSchema,
  password: UserPasswordSchema,
  birthDate: UserBirthDateSchema,
  biography: UserBiographySchema
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
