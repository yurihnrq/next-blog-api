import { IRemovePostService } from '@src/modules/post/services/interfaces/IRemovePostService';

export class RemovePostServiceMock implements IRemovePostService {
  execute(_id: string): Promise<void> {
    return Promise.resolve();
  }
}
