import { Post } from '@prisma/client';

export interface IPostRepository {
  getAll(page: number): Promise<Post[]>;
  getById(id: string): Promise<Post | null>;
  create(post: Post): void;
  update(post: Post): void;
  delete(id: string): void;
}
