import { RemovePostController } from '@src/modules/post/controllers/RemovePostController';
import { IRemovePostService } from '@src/modules/post/services/interfaces/IRemovePostService';
import { requestMock } from '@src/__mocks__/express/requestMock';
import { responseMock } from '@src/__mocks__/express/responseMock';
import { RemovePostServiceMock } from '@src/__mocks__/modules/posts/services/RemovePostServiceMock';

const removePostService: IRemovePostService = new RemovePostServiceMock();
const removePostController: IController = new RemovePostController(
  removePostService
);

describe('RemovePostController', () => {
  it('should call removePostService and return a response', async () => {
    jest.spyOn(removePostService, 'execute');
    requestMock.query = {
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

  it('should throw ')
});
