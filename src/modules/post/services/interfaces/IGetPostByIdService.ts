import { IPost } from '../../interfaces/IPost';

export interface IGetPostByIdService {
  execute(id: string): Promise<IPost>;
}
