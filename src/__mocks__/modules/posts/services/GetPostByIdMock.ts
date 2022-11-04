import { Post } from '@src/modules/posts/interfaces/Post';
import { GetPostByIdService } from '@src/modules/posts/services/interfaces/GetPostByIdService';
import { postsMock } from '../postsMock';

export class GetPostByIdMock implements GetPostByIdService {
  execute(id: string): Promise<Post> {
    return Promise.resolve(postsMock[Number(id)]);
  }
}
