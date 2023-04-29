import { Post } from '../../../common/interfaces/Post';

export interface GetAllPostsService {
  execute(page: number): Promise<Post[]>;
}
