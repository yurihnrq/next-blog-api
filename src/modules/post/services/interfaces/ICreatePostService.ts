import { ICreatePostDTO } from '../../interfaces/ICreatePostDTO';

export interface ICreatePostService {
  execute(post: ICreatePostDTO): Promise<void>;
}
