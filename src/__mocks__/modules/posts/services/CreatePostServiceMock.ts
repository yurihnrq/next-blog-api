import { Post } from '@src/modules/post/interfaces/IPost';
import { ICreatePostService } from '@src/modules/post/services/interfaces/ICreatePostService';

export class CreatePostServiceMock implements ICreatePostService {
  execute(_post: Post): Promise<void> {
    return Promise.resolve();
  }
}
