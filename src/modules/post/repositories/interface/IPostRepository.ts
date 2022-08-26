import { IPost } from '../../interfaces/IPost';

export interface IPostRepository {
  getAll(page: number): Promise<IPost[]>;
  getById(id: string): Promise<IPost | null>;
  create(post: IPost): void;
  update(post: IPost): void;
  delete(id: string): void;
}
