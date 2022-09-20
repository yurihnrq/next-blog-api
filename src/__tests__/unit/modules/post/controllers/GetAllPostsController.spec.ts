import { GetAllPostsController } from '@src/modules/post/controllers/GetAllPostsController';
import { IGetAllPostsService } from '@src/modules/post/services/interfaces/IGetAllPostsService';
import { requestMock } from '@src/__mocks__/express/requestMock';
import { responseMock } from '@src/__mocks__/express/responseMock';
import { postsMock } from '@src/__mocks__/modules/posts/postsMock';
import { GetAllPostsServiceMock } from '@src/__mocks__/modules/posts/services/GetAllPostsServiceMock';

const getAllPostsService: IGetAllPostsService = new GetAllPostsServiceMock();
const getAllPostsController: IController = new GetAllPostsController(
  getAllPostsService
);

describe('GetAllPostsController', () => {
  it('should call getAllPostsService and return all posts', async () => {
    jest.spyOn(getAllPostsService, 'execute');
    requestMock.query = {
      page: undefined
    };

    const result = await getAllPostsController.execute(
      requestMock,
      responseMock
    );

    expect(result.status).toHaveBeenCalledWith(200);
    expect(result.json).toHaveBeenCalledWith({
      success: true,
      message: 'Posts fetched successfully.',
      data: postsMock
    });
    expect(getAllPostsService.execute).toHaveBeenCalledWith(1);
  });
});
