import { z } from 'zod';

export const UserNameSchema = z
  .string({
    required_error: 'Name is required.'
  })
  .min(3, {
    message: 'Name must have at least 3 characters.'
  })
  .max(255, {
    message: 'Name must have less than 255 characters.'
  });
