import { PostsRepository } from '@src/modules/posts/repositories/interfaces/PostsRepository';
import { CreatePost } from '@src/modules/posts/services/CreatePost';
import { CreatePostService } from '@src/modules/posts/services/interfaces/CreatePostService';
import { postsMock } from '@src/__mocks__/modules/posts/postsMock';
import { PostsRepositoryMock } from '@src/__mocks__/modules/posts/repositories/PostsRepositoryMock';

const postsRepository: PostsRepository = new PostsRepositoryMock();
const createPostService: CreatePostService = new CreatePost(postsRepository);

describe('CreatePost', () => {
  it('should create a post', async () => {
    jest.spyOn(postsRepository, 'create');

    await createPostService.execute(postsMock[0]);

    expect(postsRepository.create).toHaveBeenCalledWith(postsMock[0]);
  });
});
