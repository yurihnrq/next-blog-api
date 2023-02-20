import { z } from 'zod';

export const UserBirthDateSchema = z.union(
  [
    z.date({
      required_error: 'Birth date is required.'
    }),
    z.string({
      required_error: 'Birth date is required.'
    })
  ],
  {
    required_error: 'Birth date is required.',
    invalid_type_error: 'Birth date must be a date or a string.'
  }
);
