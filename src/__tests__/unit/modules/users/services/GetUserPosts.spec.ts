import { UsersRepositoryMock } from '@mocks/modules/users/repositories/UsersRepositoryMock';
import { UsersRepository } from '@src/modules/users/repositories/interfaces/UsersRepository';
import { GetUserPostsService } from '@src/modules/users/services/interfaces/GetUserPostsService';
import { postsMock } from '@src/__mocks__/modules/posts/postsMock';
import { GetUserPosts } from '@src/modules/users/services/GetUserPosts';
import APIError from '@src/errors/APIError';

const usersRepository: UsersRepository = new UsersRepositoryMock();
const getUserPostsService: GetUserPostsService = new GetUserPosts(
  usersRepository
);

describe('GetUserPosts service', () => {
  it('should be able to get all posts', async () => {
    jest.spyOn(usersRepository, 'getPosts');

    const userPosts = await getUserPostsService.execute('user-id', 1);

    expect(userPosts).toEqual(postsMock);
    expect(usersRepository.getPosts).toHaveBeenCalledWith('user-id', 1);
  });

  it('should throw na APIError if provided author id is invalid', async () => {
    jest.spyOn(usersRepository, 'getById').mockResolvedValue(null);

    try {
      await getUserPostsService.execute('user-id', 1);
    } catch (error) {
      expect(error).toBeInstanceOf(APIError);
      expect((error as APIError).status).toBe(404);
      expect((error as APIError).message).toBe(
        'Provided author id is not valid.'
      );
    }

    expect.assertions(3);
  });

  it('should throw an APIError if no posts are found', async () => {
    jest.spyOn(usersRepository, 'getPosts').mockResolvedValue([]);

    try {
      await getUserPostsService.execute('user-id', 1);
    } catch (error) {
      expect(error).toBeInstanceOf(APIError);
      expect((error as APIError).status).toBe(204);
      expect((error as APIError).message).toBe('No posts found for this user.');
    }

    expect.assertions(3);
  });
});
