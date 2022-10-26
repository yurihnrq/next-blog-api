import { Post } from '../../interfaces/Post';

export interface GetAllPostsService {
  execute(page: number): Promise<Post[]>;
}
