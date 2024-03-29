import { CreatePostDTO } from '@src/modules/posts/interfaces/CreatePostDTO';
import { Post } from '@src/modules/posts/interfaces/Post';
import { UpdatePostDTO } from '@src/modules/posts/interfaces/UpdatePostDTO';
import { PostsRepository } from '@src/modules/posts/repositories/interfaces/PostsRepository';
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
