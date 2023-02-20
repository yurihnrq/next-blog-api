import { z } from 'zod';

export const PostTitleSchema = z
  .string({
    required_error: 'Title is required.',
    invalid_type_error: 'Title must be a string.'
  })
  .min(4, {
    message: 'Title must be at least 4 characters long.'
  })
  .max(255, {
    message: 'Title must be at most 255 characters long.'
  });
