import APIError from '@src/errors/APIError';
import { GetPostByIdController } from '@src/modules/posts/controllers/GetPostByIdController';
import { GetPostByIdService } from '@src/modules/posts/services/interfaces/GetPostByIdService';
import { requestMock } from '@src/__mocks__/express/requestMock';
import { responseMock } from '@src/__mocks__/express/responseMock';
import { postsMock } from '@src/__mocks__/modules/posts/postsMock';
import { GetPostByIdMock } from '@src/__mocks__/modules/posts/services/GetPostByIdMock';

const getPostByIdService: GetPostByIdService = new GetPostByIdMock();
const getPostByIdController: APIController = new GetPostByIdController(
  getPostByIdService
);

describe('GetPostByIdController', () => {
  beforeEach(() => {
    jest.spyOn(getPostByIdService, 'execute');
  });

  it('should call getPostByIdService and return a post', async () => {
    jest.spyOn(responseMock, 'status');
    jest.spyOn(responseMock, 'json');
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
