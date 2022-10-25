import { Post } from '../../interfaces/Post';

export interface IGetPostByIdService {
  execute(id: string): Promise<Post>;
}
