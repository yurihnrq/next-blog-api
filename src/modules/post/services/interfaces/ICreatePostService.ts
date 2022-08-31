import { IPost } from '../../interfaces/IPost';

export interface ICreatePostService {
  execute(post: IPost): Promise<void>;
}
