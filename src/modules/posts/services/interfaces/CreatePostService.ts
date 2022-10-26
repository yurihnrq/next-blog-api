import { CreatePostDTO } from '../../interfaces/CreatePostDTO';

export interface CreatePostService {
  execute(post: CreatePostDTO): Promise<void>;
}
