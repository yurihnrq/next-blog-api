import APIError from '@src/errors/APIError';
import { PostsRepository } from '@src/modules/post/repositories/interface/PostsRepository';
import { IUpdatePostService } from '@src/modules/post/services/interfaces/IUpdatePostService';
import { UpdatePostService } from '@src/modules/post/services/UpdatePostService';
import { PostsRepositoryMock } from '@src/__mocks__/modules/posts/repositories/PostsRepositoryMock';

const postsRepository: PostsRepository = new PostsRepositoryMock();
const updatePostService: IUpdatePostService = new UpdatePostService(
  postsRepository
);

describe('UpdatePostService', () => {
  it('should update a post', async () => {
    jest.spyOn(postsRepository, 'update');

    await updatePostService.execute({
      id: '1',
      title: 'New title',
      content: 'New content',
      updateAuthorId: '1'
    });

    expect(postsRepository.update).toHaveBeenCalledWith({
      id: '1',
      title: 'New title',
      content: 'New content',
      updateAuthorId: '1'
    });
  });

  it('should throw an APIError if post with provided id does not exist', async () => {
    jest.spyOn(postsRepository, 'getById').mockResolvedValue(null);

    try {
      await updatePostService.execute({
        id: '1',
        title: 'New title',
        content: 'New content',
        updateAuthorId: '1'
      });
    } catch (error) {
      expect(error).toBeInstanceOf(APIError);
      expect((error as APIError).status).toBe(404);
      expect((error as APIError).message).toBe(
        'Post with provided id does not exist.'
      );
    }

    expect.assertions(3);
  });

  it('should throw an APIError if a user tries to update other user post', async () => {
    jest.spyOn(postsRepository, 'getById').mockResolvedValue({
      id: '1',
      title: 'Old title',
      content: 'Old content',
      authorId: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    try {
      await updatePostService.execute({
        id: '1',
        title: 'New title',
        content: 'New content',
        updateAuthorId: '2'
      });
    } catch (error) {
      expect(error).toBeInstanceOf(APIError);
      expect((error as APIError).status).toBe(403);
      expect((error as APIError).message).toBe(
        'You are not allowed to update this post.'
      );
    }

    expect.assertions(3);
  });
});
