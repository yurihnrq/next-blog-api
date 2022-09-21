import { IPost } from '@src/modules/post/interfaces/IPost';
import { IGetAllPostsService } from '@src/modules/post/services/interfaces/IGetAllPostsService';
import { postsMock } from '../postsMock';

export class GetAllPostsServiceMock implements IGetAllPostsService {
  execute = async (_page: number): Promise<IPost[]> => {
    return Promise.resolve(postsMock);
  };
}
