import APIError from '@src/errors/APIError';
import { UpdatePostController } from '@src/modules/posts/controllers/UpdatePostController';
import { UpdatePostService } from '@src/modules/posts/services/interfaces/UpdatePostService';
import { requestMock } from '@src/__mocks__/express/requestMock';
import { responseMock } from '@src/__mocks__/express/responseMock';
import { UpdatePostServiceMock } from '@src/__mocks__/modules/posts/services/UpdatePostServiceMock';

const updatePostService: UpdatePostService = new UpdatePostServiceMock();
const updatePostController: APIController = new UpdatePostController(
  updatePostService
);

describe('UpdatePostController', () => {
  it('should call updatePostService and return a response', async () => {
    jest.spyOn(updatePostService, 'execute');
    requestMock.body = {
      title: 'New title',
      content: 'New content'
    };
    requestMock.params = {
      id: '1'
    };
    responseMock.locals.authInfo = {
      userId: '1'
    };

    const result = await updatePostController.execute(
      requestMock,
      responseMock
    );

    expect(result.status).toHaveBeenCalledWith(200);
    expect(result.json).toHaveBeenCalledWith({
      success: true,
      message: 'Post updated successfully.',
      data: null
    });
    expect(updatePostService.execute).toHaveBeenCalledWith({
      id: '1',
      title: 'New title',
      content: 'New content',
      updateAuthorId: '1'
    });
  });

  it('should throw an APIError if post id is not provided', async () => {
    requestMock.body = {
      title: 'New title',
      content: 'New content'
    };
    requestMock.params = {
      id: undefined as unknown as string
    };
    responseMock.locals.authInfo = {
      userId: '1'
    };

    try {
      await updatePostController.execute(requestMock, responseMock);
    } catch (error) {
      expect(error).toBeInstanceOf(APIError);
      expect((error as APIError).message).toBe('Post id is required.');
      expect((error as APIError).status).toBe(400);
    }

    expect.assertions(3);
  });
});
