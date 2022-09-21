import { CreatePostController } from '@src/modules/post/controllers/CreatePostController';
import { ICreatePostService } from '@src/modules/post/services/interfaces/ICreatePostService';
import { requestMock } from '@src/__mocks__/express/requestMock';
import { responseMock } from '@src/__mocks__/express/responseMock';
import { postsMock } from '@src/__mocks__/modules/posts/postsMock';
import { CreatePostServiceMock } from '@src/__mocks__/modules/posts/services/CreatePostServiceMock';

const createPostService: ICreatePostService = new CreatePostServiceMock();
const createPostController: IController = new CreatePostController(
  createPostService
);

describe('CreatePostController', () => {
  it('should call the createPostService and return a response', async () => {
    requestMock.body = {
      title: postsMock[0].title,
      content: postsMock[0].content
    };
    responseMock.locals.authInfo = {
      userId: postsMock[0].authorId
    };
    jest.spyOn(createPostService, 'execute');

    await createPostController.execute(requestMock, responseMock);

    expect(createPostService.execute).toHaveBeenCalledWith({
      title: postsMock[0].title,
      content: postsMock[0].content,
      authorId: postsMock[0].authorId
    });
    expect(responseMock.status).toHaveBeenCalledWith(201);
    expect(responseMock.json).toHaveBeenCalledWith({
      success: true,
      message: 'Post created successfully.',
      data: null
    });
  });
});
