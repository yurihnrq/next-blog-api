import { Post } from '@src/modules/posts/interfaces/Post';
import { GetAllPostsService } from '@src/modules/posts/services/interfaces/GetAllPostsService';
import { postsMock } from '../postsMock';

export class GetAllPostsMock implements GetAllPostsService {
  execute = async (_page: number): Promise<Post[]> => {
    return Promise.resolve(postsMock);
  };
}
