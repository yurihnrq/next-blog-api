import { Post } from '@src/modules/common/interfaces/Post';
import { GetUserPostsService } from '@src/modules/users/services/interfaces/GetUserPostsService';
import { postsMock } from '../../posts/postsMock';

export class GetUserPostsServiceMock implements GetUserPostsService {
  execute(_authorId: string, _page: number): Promise<Post[]> {
    return Promise.resolve(postsMock);
  }
}
