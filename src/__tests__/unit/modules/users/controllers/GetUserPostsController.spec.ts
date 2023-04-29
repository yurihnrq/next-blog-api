import { requestMock } from '@mocks/express/requestMock';
import { responseMock } from '@mocks/express/responseMock';
import { GetUserPostsService } from '@src/modules/users/services/interfaces/GetUserPostsService';
import { postsMock } from '@src/__mocks__/modules/posts/postsMock';
import { GetUserPostsServiceMock } from '@src/__mocks__/modules/users/services/GetUserPostsServiceMock';
import { GetUserPostsController } from '@src/modules/users/controllers/GetUserPostsController';

const getUserPostsService: GetUserPostsService = new GetUserPostsServiceMock();
const getUserPostsController: APIController = new GetUserPostsController(
  getUserPostsService
);

describe('GetUserPostsController', () => {
  it('should call getUserPostsService and return all posts for specified user', async () => {
    jest.spyOn(responseMock, 'status');
    jest.spyOn(responseMock, 'json');
    jest.spyOn(getUserPostsService, 'execute');
    requestMock.query = {
      page: undefined
    };
    requestMock.params = {
      authorId: 'user-id'
    };

    const result = await getUserPostsController.execute(
      requestMock,
      responseMock
    );

    expect(result.status).toHaveBeenCalledWith(200);
    expect(result.json).toHaveBeenCalledWith({
      message: 'User posts fetched successfully.',
      success: true,
      data: postsMock
    });
    expect(getUserPostsService.execute).toHaveBeenCalledWith('user-id', 1);
  });
});
