import APIError from '@src/errors/APIError';
import { RemovePostController } from '@src/modules/posts/controllers/RemovePostController';
import { RemovePostService } from '@src/modules/posts/services/interfaces/RemovePostService';
import { requestMock } from '@src/__mocks__/express/requestMock';
import { responseMock } from '@src/__mocks__/express/responseMock';
import { RemovePostMock } from '@src/__mocks__/modules/posts/services/RemovePostMock';

const removePostService: RemovePostService = new RemovePostMock();
const removePostController: APIController = new RemovePostController(
  removePostService
);

describe('RemovePostController', () => {
  it('should call removePostService and return a response', async () => {
    jest.spyOn(responseMock, 'status');
    jest.spyOn(responseMock, 'json');
    jest.spyOn(removePostService, 'execute');
    requestMock.params = {
      id: '1'
    };

    const result = await removePostController.execute(
      requestMock,
      responseMock
    );

    expect(result.status).toHaveBeenCalledWith(200);
    expect(result.json).toHaveBeenCalledWith({
      success: true,
      message: 'Post removed successfully.',
      data: null
    });
    expect(removePostService.execute).toHaveBeenCalledWith('1');
  });

  it('should throw an APIError if post id is not provided', async () => {
    requestMock.params = {
      id: undefined as unknown as string
    };

    try {
      await removePostController.execute(requestMock, responseMock);
    } catch (error) {
      expect(error).toBeInstanceOf(APIError);
      expect((error as APIError).status).toBe(400);
      expect((error as APIError).message).toBe('Post id is required.');
    }

    expect.assertions(3);
  });
});
