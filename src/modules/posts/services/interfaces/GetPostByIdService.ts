import { Post } from '../../interfaces/Post';

export interface GetPostByIdService {
  execute(id: string): Promise<Post>;
}
