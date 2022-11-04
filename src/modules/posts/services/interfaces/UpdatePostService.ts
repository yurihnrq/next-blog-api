import { UpdatePostDTO } from '../../interfaces/UpdatePostDTO';

export interface UpdatePostService {
  execute(data: UpdatePostDTO): Promise<void>;
}
