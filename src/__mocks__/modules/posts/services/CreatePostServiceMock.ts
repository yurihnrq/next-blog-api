import { IPost } from '@src/modules/post/interfaces/IPost';
import { ICreatePostService } from '@src/modules/post/services/interfaces/ICreatePostService';

export class CreatePostServiceMock implements ICreatePostService {
  execute(_post: IPost): Promise<void> {
    return Promise.resolve();
  }
}
