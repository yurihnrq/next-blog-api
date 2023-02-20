import { z } from 'zod';
import { CreatePostSchema } from './CreatePostDTO';

export const UpdatePostSchema = CreatePostSchema;

export type UpdatePostType = z.infer<typeof UpdatePostSchema>;

export interface UpdatePostDTO extends UpdatePostType {
  id: string;
  updateAuthorId: string;
}
