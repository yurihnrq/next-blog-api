import { z } from 'zod';
import { PostContentSchema } from '../schemas/PostContentSchema';
import { PostTitleSchema } from '../schemas/PostTitleSchema';

export const CreatePostSchema = z.object({
  title: PostTitleSchema,
  content: PostContentSchema
});

export type CreatePostType = z.infer<typeof CreatePostSchema>;

export interface CreatePostDTO extends CreatePostType {
  authorId: string;
}
