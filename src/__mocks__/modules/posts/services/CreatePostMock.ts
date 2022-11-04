import { CreatePostDTO } from '@src/modules/posts/interfaces/CreatePostDTO';
import { CreatePostService } from '@src/modules/posts/services/interfaces/CreatePostService';

export class CreatePostMock implements CreatePostService {
  execute(_post: CreatePostDTO): Promise<void> {
    return Promise.resolve();
  }
}
