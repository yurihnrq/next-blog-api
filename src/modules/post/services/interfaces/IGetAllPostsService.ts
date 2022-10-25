import { Post } from '../../interfaces/Post';

export interface IGetAllPostsService {
  execute(page: number): Promise<Post[]>;
}
