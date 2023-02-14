import { z } from 'zod';

export const UserIdSchema = z.string({
  required_error: 'User id is required.'
});
