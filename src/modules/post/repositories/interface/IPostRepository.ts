import { Post } from '@prisma/client';
import { IPost } from '../../interfaces/IPost';

export interface IPostRepository {
  getAll(page: number): Promise<IPost[]>;
  getById(id: string): Promise<IPost | null>;
  create(post: Post): void;
  update(post: Post): void;
  delete(id: string): void;
}
