import { z } from 'zod';

export const PostContentSchema = z
  .string({
    required_error: 'Content is required.',
    invalid_type_error: 'Content must be a string.'
  })
  .min(10, {
    message: 'Content must be at least 10 characters long.'
  });
