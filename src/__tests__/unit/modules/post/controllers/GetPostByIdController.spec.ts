import { GetPostByIdController } from '@src/modules/post/controllers/GetPostByIdController';
import { IGetPostByIdService } from '@src/modules/post/services/interfaces/IGetPostByIdService';
import { requestMock } from '@src/__mocks__/express/requestMock';
import { responseMock } from '@src/__mocks__/express/responseMock';
import { postsMock } from '@src/__mocks__/modules/posts/postsMock';
import { GetPostByIdServiceMock } from '@src/__mocks__/modules/posts/services/GetPostByIdServiceMock';

const getPostByIdService: IGetPostByIdService = new GetPostByIdServiceMock();
const getPostByIdController: IController = new GetPostByIdController(
  getPostByIdService
);

describe('GetPostByIdController', () => {
  it('should call getPostByIdService and return a post', async () => {
    jest.spyOn(getPostByIdService, 'execute');
    requestMock.query = {
      id: '1'
    };

    const result = await getPostByIdController.execute(
      requestMock,
      responseMock
    );

    expect(result.status).toHaveBeenCalledWith(200);
    expect(result.json).toHaveBeenCalledWith({
      success: true,
      message: 'Post fetched successfully.',
      data: postsMock[1]
    });
    expect(getPostByIdService.execute).toHaveBeenCalledWith('1');
  });
});
