import { IPost } from '../../interfaces/IPost';

export interface IUpdatePostService {
  execute(data: IPost): Promise<void>;
}
