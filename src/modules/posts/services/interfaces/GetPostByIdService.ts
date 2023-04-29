import { Post } from '../../../common/interfaces/Post';

export interface GetPostByIdService {
  execute(id: string): Promise<Post>;
}
