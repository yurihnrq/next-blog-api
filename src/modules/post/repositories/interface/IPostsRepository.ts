import { IPost } from '../../interfaces/IPost';
import { ICreatePostDTO } from '../../interfaces/ICreatePostDTO';

export interface IPostsRepository {
  getAll(page: number): Promise<IPost[]>;
  getById(id: string): Promise<IPost | null>;
  create(post: ICreatePostDTO): Promise<void>;
  update(post: IPost): Promise<void>;
  remove(id: string): Promise<void>;
}
