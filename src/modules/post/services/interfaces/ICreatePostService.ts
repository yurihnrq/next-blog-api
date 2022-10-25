import { CreatePostDTO } from '../../interfaces/CreatePostDTO';

export interface ICreatePostService {
  execute(post: CreatePostDTO): Promise<void>;
}
