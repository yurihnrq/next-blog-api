import { IPost } from '@src/modules/post/interfaces/IPost';
import { IGetPostByIdService } from '@src/modules/post/services/interfaces/IGetPostByIdService';
import { postsMock } from '../postsMock';

export class GetPostByIdServiceMock implements IGetPostByIdService {
  execute(id: string): Promise<IPost> {
    return Promise.resolve(postsMock[Number(id)]);
  }
}
