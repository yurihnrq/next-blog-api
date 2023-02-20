import { z } from 'zod';

export const UserEmailSchema = z
  .string({
    required_error: 'Email is required.',
    invalid_type_error: 'Email must be a string.'
  })
  .email({
    message: 'Invalid email.'
  })
  .max(255, {
    message: 'Email must have less than 255 characters.'
  })
  .min(5, {
    message: 'Email must have at least 5 characters.'
  });
