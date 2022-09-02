import { IPostsRepository } from '@src/modules/post/repositories/interface/IPostsRepository';
import { IRemovePostService } from '@src/modules/post/services/interfaces/IRemovePostService';
import { RemovePostService } from '@src/modules/post/services/RemovePostService';
import { postsMock } from '@src/__mocks__/modules/posts/postsMock';
import { PostsRepositoryMock } from '@src/__mocks__/modules/posts/repositories/PostsRepositoryMock';

const postsRepository: IPostsRepository = new PostsRepositoryMock();
const removePostService: IRemovePostService = new RemovePostService(
  postsRepository
);

describe('RemovePostService', () => {
  it('shoule remove a post', async () => {
    jest.spyOn(postsRepository, 'getById').mockResolvedValue(postsMock[0]);
    jest.spyOn(postsRepository, 'delete').mockImplementation();

    await removePostService.execute(postsMock[0].id as string);

    expect(postsRepository.getById).toHaveBeenCalledWith(postsMock[0].id);
    expect(postsRepository.delete).toHaveBeenCalledWith(postsMock[0].id);
  });
});
