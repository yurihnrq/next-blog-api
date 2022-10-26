import { Post } from '@src/modules/post/interfaces/IPost';
import { GetAllPostsService } from '@src/modules/posts/services/interfaces/GetAllPostsService';
import { postsMock } from '../postsMock';

export class GetAllPostsServiceMock implements GetAllPostsService {
  execute = async (_page: number): Promise<Post[]> => {
    return Promise.resolve(postsMock);
  };
}
