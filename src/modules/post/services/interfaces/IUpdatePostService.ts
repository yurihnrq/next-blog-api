import { IUpdatePostDTO } from '../../interfaces/IUpdatePostDTO';

export interface IUpdatePostService {
  execute(data: IUpdatePostDTO): Promise<void>;
}
