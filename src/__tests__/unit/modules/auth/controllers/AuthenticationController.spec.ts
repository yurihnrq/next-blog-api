import { AuthenticationController } from '@src/modules/auth/controllers/AuthenticationController';
import { requestMock } from '@mocks/express/requestMock';
import { responseMock } from '@mocks/express/responseMock';
import { IClientAuthService } from '@src/modules/auth/services/interfaces/IClientAuthService';
import { ClientAuthServiceMock } from '@mocks/modules/auth/services/ClientAuthServiceMock';
import { IGenerateTokenService } from '@src/modules/auth/services/interfaces/IGenerateTokenService';
import { GenerateTokenServiceMock } from '@mocks/modules/auth/services/GenerateTokenServiceMock';
import { IAuthInfo } from '@src/modules/auth/services/interfaces/IAuthInfo';

const clientAuthService: IClientAuthService = new ClientAuthServiceMock();
const generateTokenService: IGenerateTokenService =
  new GenerateTokenServiceMock();
const authenticationController: IController = new AuthenticationController(
  clientAuthService,
  generateTokenService
);

const token = 'token';
const email = 'test@mail.com';
const password = 'test-password';

requestMock.body = {
  email,
  password
};

const authInfo: IAuthInfo = {
  userId: '1',
  authAt: new Date()
};

describe('AuthenticationController', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('13-06-2022'));
  });

  beforeEach(() => {
    jest.spyOn(clientAuthService, 'execute').mockResolvedValue(authInfo);
  });

  it('should return a response with a token and a message', async () => {
    await authenticationController.execute(requestMock, responseMock);

    expect(responseMock.status).toHaveBeenCalledWith(200);
    expect(responseMock.json).toHaveBeenCalledWith({
      success: true,
      message: 'Authentication successful.',
      data: token
    });
  });

  it('should get IAuthInfo object from clientAuthService', async () => {
    jest.spyOn(clientAuthService, 'execute');

    await authenticationController.execute(requestMock, responseMock);

    expect(clientAuthService.execute).toHaveBeenCalledWith(email, password);
  });

  it('should call generateTokenService with IAuthInfo object', async () => {
    jest.spyOn(generateTokenService, 'execute');

    await authenticationController.execute(requestMock, responseMock);

    expect(generateTokenService.execute).toHaveBeenCalledWith(authInfo);
  });

  it('should return token generated by generateTokenService', async () => {
    jest
      .spyOn(generateTokenService, 'execute')
      .mockResolvedValue(`test-${token}`);

    await authenticationController.execute(requestMock, responseMock);

    expect(responseMock.json).toHaveBeenCalledWith({
      success: true,
      message: 'Authentication successful.',
      data: `test-${token}`
    });
  });
});
