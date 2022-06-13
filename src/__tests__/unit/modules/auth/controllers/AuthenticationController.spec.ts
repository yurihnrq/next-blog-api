import { AuthenticationController } from '@src/modules/auth/controllers/AuthenticationController';
import { IController } from '@src/types/IController';
import { requestMock } from '@mocks/express/requestMock';
import { responseMock } from '@mocks/express/responseMock';
import { IClientAuthService } from '@src/modules/auth/services/interfaces/IClientAuthService';
import { ClientAuthServiceMock } from '@mocks/modules/auth/services/ClientAuthServiceMock';

const clientAuthService: IClientAuthService = new ClientAuthServiceMock();
const authenticationController: IController = new AuthenticationController(
  clientAuthService
);

const token = 'token';
const email = 'test@mail.com';
const password = 'test-password';

describe('AuthenticationController', () => {
  it('should return a response with a token and a message', async () => {
    await authenticationController.execute(requestMock, responseMock);

    expect(responseMock.status).toHaveBeenCalledWith(200);
    expect(responseMock.json).toHaveBeenCalledWith({
      message: 'Authentication successful.',
      data: token
    });
  });

  it('should get IAuthInfo object from clientAuthService', async () => {
    jest.spyOn(clientAuthService, 'execute');
    requestMock.body = {
      email,
      password
    };

    await authenticationController.execute(requestMock, responseMock);

    expect(clientAuthService.execute).toHaveBeenCalledWith(email, password);
  });
});
