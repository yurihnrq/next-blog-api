import { z } from 'zod';
import { CreateUserSchema } from './CreateUserDTO';

export const UpdateUserSchema = CreateUserSchema;

export type UpdateUserType = z.infer<typeof UpdateUserSchema>;

export interface UpdateUserDTO extends UpdateUserType {
  id: string;
}
