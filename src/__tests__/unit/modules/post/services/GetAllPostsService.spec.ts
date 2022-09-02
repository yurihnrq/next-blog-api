import { IPostsRepository } from '@src/modules/post/repositories/interface/IPostsRepository';
import { GetAllPostsService } from '@src/modules/post/services/GetAllPostsService';
import { IGetAllPostsService } from '@src/modules/post/services/interfaces/IGetAllPostsService';
import { postsMock } from '@src/__mocks__/modules/posts/postsMock';
import { PostsRepositoryMock } from '@src/__mocks__/modules/posts/repositories/PostsRepositoryMock';

const postsRepository: IPostsRepository = new PostsRepositoryMock();
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
});
