import { z } from 'zod';

export const UserBiographySchema = z
  .string({
    invalid_type_error: 'Biography must be a string.'
  })
  .nullable();
