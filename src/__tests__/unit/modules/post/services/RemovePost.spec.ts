import APIError from '@src/errors/APIError';
import { PostsRepository } from '@src/modules/posts/repositories/interface/PostsRepository';
import { RemovePostService } from '@src/modules/posts/services/interfaces/RemovePostService';
import { RemovePost } from '@src/modules/posts/services/RemovePost';
import { postsMock } from '@src/__mocks__/modules/posts/postsMock';
import { PostsRepositoryMock } from '@src/__mocks__/modules/posts/repositories/PostsRepositoryMock';

const postsRepository: PostsRepository = new PostsRepositoryMock();
const removePostService: RemovePostService = new RemovePost(postsRepository);

describe('RemovePost', () => {
  it('shoule remove a post', async () => {
    jest.spyOn(postsRepository, 'getById').mockResolvedValue(postsMock[0]);
    jest.spyOn(postsRepository, 'remove');

    await removePostService.execute(postsMock[0].id as string);

    expect(postsRepository.getById).toHaveBeenCalledWith(postsMock[0].id);
    expect(postsRepository.remove).toHaveBeenCalledWith(postsMock[0].id);
  });

  it('should throw an error if post with provided id does not exist', async () => {
    jest.spyOn(postsRepository, 'getById').mockResolvedValue(null);

    try {
      await removePostService.execute(postsMock[0].id as string);
    } catch (error) {
      expect((error as APIError).status).toBe(404);
      expect((error as APIError).message).toBe(
        'Post with provided id does not exist.'
      );
    }

    expect.assertions(2);
  });
});
