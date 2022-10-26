import { CreatePostDTO } from '@src/modules/post/interfaces/ICreatePostDTO';
import { Post } from '@src/modules/post/interfaces/IPost';
import { UpdatePostDTO } from '@src/modules/post/interfaces/IUpdatePostDTO';
import { PostsRepository } from '@src/modules/posts/repositories/interface/PostsRepository';
import { postsMock } from '../postsMock';

export class PostsRepositoryMock implements PostsRepository {
  getAll(_page: number): Promise<Post[]> {
    return Promise.resolve(postsMock);
  }

  getById(id: string): Promise<Post | null> {
    return Promise.resolve(postsMock[Number(id) - 1] || null);
  }

  create(_post: CreatePostDTO): Promise<void> {
    return Promise.resolve();
  }

  update(_post: UpdatePostDTO): Promise<void> {
    return Promise.resolve();
  }

  remove(_id: string): Promise<void> {
    return Promise.resolve();
  }
}
