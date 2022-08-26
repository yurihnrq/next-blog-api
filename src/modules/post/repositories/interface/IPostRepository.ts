import { IPost } from '../../interfaces/IPost';

export interface IPostRepository {
  getAll(page: number): Promise<IPost[]>;
  getById(id: string): Promise<IPost | null>;
  create(post: IPost): Promise<void>;
  update(post: IPost): Promise<void>;
  delete(id: string): Promise<void>;
}
