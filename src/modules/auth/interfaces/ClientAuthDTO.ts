import { z } from 'zod';
import { UserEmailSchema } from '@src/modules/common/schemas/UserEmailSchema';
import { UserPasswordSchema } from '@src/modules/common/schemas/UserPasswordSchema';

export const ClientAuthSchema = z.object({
  email: UserEmailSchema,
  password: UserPasswordSchema
});

export type ClientAuthDTO = z.infer<typeof ClientAuthSchema>;
