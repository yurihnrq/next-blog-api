import { UpdatePostDTO } from '@src/modules/posts/interfaces/UpdatePostDTO';
import { UpdatePostService } from '@src/modules/posts/services/interfaces/UpdatePostService';

export class UpdatePostMock implements UpdatePostService {
  execute(_data: UpdatePostDTO): Promise<void> {
    return Promise.resolve();
  }
}
