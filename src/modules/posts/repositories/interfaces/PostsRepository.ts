import { Post } from '../../../common/interfaces/Post';
import { CreatePostDTO } from '../../interfaces/CreatePostDTO';
import { UpdatePostDTO } from '../../interfaces/UpdatePostDTO';

export interface PostsRepository {
  getAll(page: number): Promise<Post[]>;
  getById(id: string): Promise<Post | null>;
  create(post: CreatePostDTO): Promise<void>;
  update(post: UpdatePostDTO): Promise<void>;
  remove(id: string): Promise<void>;
}
