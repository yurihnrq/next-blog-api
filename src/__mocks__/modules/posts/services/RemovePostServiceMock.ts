import { RemovePostService } from '@src/modules/posts/services/interfaces/IRemovePostService';

export class RemovePostServiceMock implements RemovePostService {
  execute(_id: string): Promise<void> {
    return Promise.resolve();
  }
}
