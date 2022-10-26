import { Post } from '@src/modules/post/interfaces/IPost';
import { CreatePostService } from '@src/modules/posts/services/interfaces/CreatePostService';

export class CreatePostServiceMock implements CreatePostService {
  execute(_post: Post): Promise<void> {
    return Promise.resolve();
  }
}
