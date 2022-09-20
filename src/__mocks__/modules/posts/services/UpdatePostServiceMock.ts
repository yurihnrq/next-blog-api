import { IUpdatePostDTO } from '@src/modules/post/interfaces/IUpdatePostDTO';
import { IUpdatePostService } from '@src/modules/post/services/interfaces/IUpdatePostService';

export class UpdatePostServiceMock implements IUpdatePostService {
  execute(_data: IUpdatePostDTO): Promise<void> {
    return Promise.resolve();
  }
}
