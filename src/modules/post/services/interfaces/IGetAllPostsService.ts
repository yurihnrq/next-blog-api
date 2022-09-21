import { IPost } from '../../interfaces/IPost';

export interface IGetAllPostsService {
  execute(page: number): Promise<IPost[]>;
}
