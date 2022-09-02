import { IPost } from '@src/modules/post/interfaces/IPost';
import { IPostsRepository } from '@src/modules/post/repositories/interface/IPostsRepository';
import { postsMock } from '../postsMock';

export class PostsRepositoryMock implements IPostsRepository {
  getAll(_page: number): Promise<IPost[]> {
    return Promise.resolve(postsMock);
  }

  getById(id: string): Promise<IPost | null> {
    return Promise.resolve(postsMock[Number(id)] || null);
  }

  create(_post: IPost): Promise<void> {
    return Promise.resolve();
  }

  update(_post: IPost): Promise<void> {
    return Promise.resolve();
  }

  remove(_id: string): Promise<void> {
    return Promise.resolve();
  }
}
