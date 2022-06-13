import { AuthenticationController } from '@src/modules/auth/controllers/AuthenticationController';
import { IController } from '@src/types/IController';
import { requestMock } from '@mocks/express/requestMock';
import { responseMock } from '@src/__mocks__/express/responseMock';

const authenticationController: IController = new AuthenticationController();

const token = 'token';

describe('AuthenticationController', () => {
  it('should return a response with a token and a message', async () => {
    await authenticationController.execute(requestMock, responseMock);

    expect(responseMock.status).toHaveBeenCalledWith(200);
    expect(responseMock.json).toHaveBeenCalledWith({
      message: 'Authentication successful.',
      data: token
    });
  });
});
