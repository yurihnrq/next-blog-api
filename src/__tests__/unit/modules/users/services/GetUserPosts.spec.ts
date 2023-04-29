import { UsersRepositoryMock } from '@mocks/modules/users/repositories/UsersRepositoryMock';
import { UsersRepository } from '@src/modules/users/repositories/interfaces/UsersRepository';
import { GetUserPostsService } from '@src/modules/users/services/interfaces/GetUserPostsService';
import { postsMock } from '@src/__mocks__/modules/posts/postsMock';
import { GetUserPosts } from '@src/modules/users/services/GetUserPosts';

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
});
