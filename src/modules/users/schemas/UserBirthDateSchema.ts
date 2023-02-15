import { z } from 'zod';

export const UserBirthDateSchema = z.union([
  z.date({
    required_error: 'Birth date is required.'
  }),
  z.string({
    required_error: 'Birth date is required.'
  })
]);
