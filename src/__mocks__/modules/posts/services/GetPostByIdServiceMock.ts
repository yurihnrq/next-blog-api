import { Post } from '@src/modules/post/interfaces/IPost';
import { GetPostByIdService } from '@src/modules/posts/services/interfaces/IGetPostByIdService';
import { postsMock } from '../postsMock';

export class GetPostByIdServiceMock implements GetPostByIdService {
  execute(id: string): Promise<Post> {
    return Promise.resolve(postsMock[Number(id)]);
  }
}
