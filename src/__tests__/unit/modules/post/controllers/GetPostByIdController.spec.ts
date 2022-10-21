import APIError from '@src/errors/APIError';
import { GetPostByIdController } from '@src/modules/post/controllers/GetPostByIdController';
import { IGetPostByIdService } from '@src/modules/post/services/interfaces/IGetPostByIdService';
import { requestMock } from '@src/__mocks__/express/requestMock';
import { responseMock } from '@src/__mocks__/express/responseMock';
import { postsMock } from '@src/__mocks__/modules/posts/postsMock';
import { GetPostByIdServiceMock } from '@src/__mocks__/modules/posts/services/GetPostByIdServiceMock';

const getPostByIdService: IGetPostByIdService = new GetPostByIdServiceMock();
const getPostByIdController: APIController = new GetPostByIdController(
  getPostByIdService
);

describe('GetPostByIdController', () => {
  beforeEach(() => {
    jest.spyOn(getPostByIdService, 'execute');
  });

  it('should call getPostByIdService and return a post', async () => {
    requestMock.params = {
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

  it('should throw an APIError if post id is not provided', async () => {
    requestMock.params = {
      id: undefined as unknown as string
    };

    try {
      await getPostByIdController.execute(requestMock, responseMock);
    } catch (error) {
      expect(error).toBeInstanceOf(APIError);
      expect((error as APIError).status).toBe(400);
      expect((error as APIError).message).toBe('Post id is required.');
    }

    expect.assertions(3);
  });
});
