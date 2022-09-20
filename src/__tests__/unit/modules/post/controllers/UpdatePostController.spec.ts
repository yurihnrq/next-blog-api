import { UpdatePostController } from '@src/modules/post/controllers/UpdatePostController';
import { IUpdatePostDTO } from '@src/modules/post/interfaces/IUpdatePostDTO';
import { IUpdatePostService } from '@src/modules/post/services/interfaces/IUpdatePostService';
import { requestMock } from '@src/__mocks__/express/requestMock';
import { responseMock } from '@src/__mocks__/express/responseMock';
import { UpdatePostServiceMock } from '@src/__mocks__/modules/posts/services/UpdatePostServiceMock';

const updatePostService: IUpdatePostService = new UpdatePostServiceMock();
const updatePostController: IController = new UpdatePostController(
  updatePostService
);

describe('UpdatePostController', () => {
  it('should call updatePostService and return a response', async () => {
    jest.spyOn(updatePostService, 'execute');
    requestMock.body = {
      id: '1',
      title: 'New title',
      content: 'New content'
    } as IUpdatePostDTO;

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
      content: 'New content'
    });
  });
});
