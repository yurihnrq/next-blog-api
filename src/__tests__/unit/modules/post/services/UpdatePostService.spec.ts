import APIError from '@src/errors/APIError';
import { IPostsRepository } from '@src/modules/post/repositories/interface/IPostsRepository';
import { IUpdatePostService } from '@src/modules/post/services/interfaces/IUpdatePostService';
import { UpdatePostService } from '@src/modules/post/services/UpdatePostService';
import { PostsRepositoryMock } from '@src/__mocks__/modules/posts/repositories/PostsRepositoryMock';

const postsRepository: IPostsRepository = new PostsRepositoryMock();
const updatePostService: IUpdatePostService = new UpdatePostService(
  postsRepository
);

describe('UpdatePostService', () => {
  it('should update a post', async () => {
    jest.spyOn(postsRepository, 'update');

    await updatePostService.execute({
      id: '1',
      title: 'New title',
      content: 'New content'
    });

    expect(postsRepository.update).toHaveBeenCalledWith({
      id: '1',
      title: 'New title',
      content: 'New content'
    });
  });

  it('should throw an APIError if post with provided id does not exist', async () => {
    jest.spyOn(postsRepository, 'getById').mockResolvedValue(null);

    try {
      await updatePostService.execute({
        id: '1',
        title: 'New title',
        content: 'New content'
      });
    } catch (error) {
      expect((error as APIError).status).toBe(404);
      expect((error as APIError).message).toBe(
        'Post with provided id does not exist.'
      );
    }

    expect.assertions(2);
  });
});
