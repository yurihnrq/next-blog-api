import { PostsRepository } from '@src/modules/post/repositories/interface/PostsRepository';
import { CreatePostService } from '@src/modules/post/services/CreatePostService';
import { ICreatePostService } from '@src/modules/post/services/interfaces/ICreatePostService';
import { postsMock } from '@src/__mocks__/modules/posts/postsMock';
import { PostsRepositoryMock } from '@src/__mocks__/modules/posts/repositories/PostsRepositoryMock';

const postsRepository: PostsRepository = new PostsRepositoryMock();
const createPostService: ICreatePostService = new CreatePostService(
  postsRepository
);

describe('CreatePostService', () => {
  it('should create a post', async () => {
    jest.spyOn(postsRepository, 'create');

    await createPostService.execute(postsMock[0]);

    expect(postsRepository.create).toHaveBeenCalledWith(postsMock[0]);
  });
});
