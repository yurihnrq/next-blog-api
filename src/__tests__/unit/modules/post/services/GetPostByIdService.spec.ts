import APIError from '@src/errors/APIError';
import { IPostsRepository } from '@src/modules/post/repositories/interface/IPostsRepository';
import { GetPostByIdService } from '@src/modules/post/services/GetPostByIdService';
import { IGetPostByIdService } from '@src/modules/post/services/interfaces/IGetPostByIdService';
import { postsMock } from '@src/__mocks__/modules/posts/postsMock';
import { PostsRepositoryMock } from '@src/__mocks__/modules/posts/repositories/PostsRepositoryMock';

const postsRepository: IPostsRepository = new PostsRepositoryMock();
const getPostByIdService: IGetPostByIdService = new GetPostByIdService(
  postsRepository
);

describe('GetPostByIdService', () => {
  it('it should return a post', async () => {
    jest.spyOn(postsRepository, 'getById').mockResolvedValue(postsMock[0]);

    const returnedPost = await getPostByIdService.execute(
      postsMock[0].id as string
    );

    expect(returnedPost).toEqual(postsMock[0]);
    expect(postsRepository.getById).toHaveBeenCalledWith(postsMock[0].id);
  });

  it('should throw an APIError if post is not found', async () => {
    jest.spyOn(postsRepository, 'getById').mockResolvedValue(null);

    try {
      await getPostByIdService.execute(postsMock[0].id as string);
    } catch (error) {
      expect((error as APIError).status).toBe(404);
      expect((error as APIError).message).toBe(
        'Post with provided id does not exist.'
      );
    }

    expect.assertions(2);
  });
});
