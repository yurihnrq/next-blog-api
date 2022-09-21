import { IPost } from '../../interfaces/IPost';
import { ICreatePostDTO } from '../../interfaces/ICreatePostDTO';
import { IUpdatePostDTO } from '../../interfaces/IUpdatePostDTO';

export interface IPostsRepository {
  getAll(page: number): Promise<IPost[]>;
  getById(id: string): Promise<IPost | null>;
  create(post: ICreatePostDTO): Promise<void>;
  update(post: IUpdatePostDTO): Promise<void>;
  remove(id: string): Promise<void>;
}
