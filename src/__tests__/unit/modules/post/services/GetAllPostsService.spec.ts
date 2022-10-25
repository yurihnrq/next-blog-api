import APIError from '@src/errors/APIError';
import { PostsRepository } from '@src/modules/post/repositories/interface/PostsRepository';
import { GetAllPostsService } from '@src/modules/post/services/GetAllPostsService';
import { IGetAllPostsService } from '@src/modules/post/services/interfaces/IGetAllPostsService';
import { postsMock } from '@src/__mocks__/modules/posts/postsMock';
import { PostsRepositoryMock } from '@src/__mocks__/modules/posts/repositories/PostsRepositoryMock';

const postsRepository: PostsRepository = new PostsRepositoryMock();
const getAllPostsService: IGetAllPostsService = new GetAllPostsService(
  postsRepository
);

describe('GetAllPostsService', () => {
  it('should return all posts', async () => {
    jest.spyOn(postsRepository, 'getAll');

    const posts = await getAllPostsService.execute(1);

    expect(posts).toEqual(postsMock);
    expect(postsRepository.getAll).toHaveBeenCalledWith(1);
  });

  it('should throw an APIError if no posts are found', async () => {
    jest.spyOn(postsRepository, 'getAll').mockResolvedValue([]);

    try {
      await getAllPostsService.execute(1);
    } catch (error) {
      expect((error as APIError).status).toBe(404);
      expect((error as APIError).message).toBe('No posts found.');
    }

    expect.assertions(2);
  });
});
