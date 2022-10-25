import { UpdatePostDTO } from '@src/modules/post/interfaces/IUpdatePostDTO';
import { IUpdatePostService } from '@src/modules/post/services/interfaces/IUpdatePostService';

export class UpdatePostServiceMock implements IUpdatePostService {
  execute(_data: UpdatePostDTO): Promise<void> {
    return Promise.resolve();
  }
}
