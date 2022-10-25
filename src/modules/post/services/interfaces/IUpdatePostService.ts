import { UpdatePostDTO } from '../../interfaces/UpdatePostDTO';

export interface IUpdatePostService {
  execute(data: UpdatePostDTO): Promise<void>;
}
