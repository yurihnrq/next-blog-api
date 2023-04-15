import { z } from 'zod';

export const UserIdSchema = z.string({
  invalid_type_error: 'User id must be a string.',
  required_error: 'User id is required.'
});
