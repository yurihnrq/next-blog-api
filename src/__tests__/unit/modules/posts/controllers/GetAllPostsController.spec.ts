import { GetAllPostsController } from '@src/modules/posts/controllers/GetAllPostsController';
import { GetAllPostsService } from '@src/modules/posts/services/interfaces/GetAllPostsService';
import { requestMock } from '@src/__mocks__/express/requestMock';
import { responseMock } from '@src/__mocks__/express/responseMock';
import { postsMock } from '@src/__mocks__/modules/posts/postsMock';
import { GetAllPostsMock } from '@src/__mocks__/modules/posts/services/GetAllPostsMock';

const getAllPostsService: GetAllPostsService = new GetAllPostsMock();
const getAllPostsController: APIController = new GetAllPostsController(
  getAllPostsService
);

describe('GetAllPostsController', () => {
  it('should call getAllPostsService and return all posts', async () => {
    jest.spyOn(responseMock, 'status');
    jest.spyOn(responseMock, 'json');
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

  it('should parse page query param if it is provided', async () => {
    jest.spyOn(global, 'parseInt');
    const page = '2';
    requestMock.query = {
      page
    };

    await getAllPostsController.execute(requestMock, responseMock);

    expect(global.parseInt).toHaveBeenCalledWith(page);
  });
});
