import { RemovePostService } from '@src/modules/posts/services/interfaces/RemovePostService';

export class RemovePostMock implements RemovePostService {
  execute(_id: string): Promise<void> {
    return Promise.resolve();
  }
}
