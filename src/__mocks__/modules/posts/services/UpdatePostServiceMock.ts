import { UpdatePostDTO } from '@src/modules/post/interfaces/IUpdatePostDTO';
import { UpdatePostService } from '@src/modules/posts/services/interfaces/IUpdatePostService';

export class UpdatePostServiceMock implements UpdatePostService {
  execute(_data: UpdatePostDTO): Promise<void> {
    return Promise.resolve();
  }
}
