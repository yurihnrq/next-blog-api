import { AuthMiddleware } from '@src/middlewares/AuthMiddleware';
import { requestMock } from '@mocks/express/requestMock';
import { responseMock } from '@mocks/express/responseMock';
import APIError from '@src/errors/APIError';
import { TokenProviderMock } from '@src/__mocks__/providers/TokenProviderMock';
import { TokenProvider } from '@src/providers/interfaces/TokenProvider';
import { AuthInfo } from '@src/modules/auth/services/interfaces/AuthInfo';

const tokenProvider: TokenProvider = new TokenProviderMock();
const authMiddleware: APIMiddleware = new AuthMiddleware(tokenProvider);

const token = 'Bearer 123';
const splitted = token.split(' ')[1];

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date('13-06-2022'));
});

const authInfo: AuthInfo = {
  userId: '123',
  authAt: new Date()
};

describe('AuthMiddleware', () => {
  beforeEach(() => {
    requestMock.headers.authorization = token;
  });

  it('should call next function', async () => {
    const next = jest.fn();

    await authMiddleware.execute(requestMock, responseMock, next);

    expect(next).toHaveBeenCalled();
  });

  it('should throw an APIError if no token is provided', async () => {
    const next = jest.fn();
    requestMock.headers.authorization = undefined;

    try {
      await authMiddleware.execute(requestMock, responseMock, next);
    } catch (error) {
      expect(error).toBeInstanceOf(APIError);
      expect((error as APIError).status).toBe(401);
      expect((error as APIError).message).toBe('Unauthorized request.');
    }

    expect.assertions(3);
  });

  it('should call tokenProvider to validate with splitted token', async () => {
    jest.spyOn(tokenProvider, 'verifyToken');

    await authMiddleware.execute(requestMock, responseMock, jest.fn());

    expect(tokenProvider.verifyToken).toHaveBeenCalledWith(splitted);
  });

  it('should set res.locals with AuthInfo object returned by tokenProvider', async () => {
    jest.spyOn(tokenProvider, 'verifyToken').mockResolvedValue(authInfo);

    await authMiddleware.execute(requestMock, responseMock, jest.fn());

    expect(responseMock.locals.authInfo).toEqual(authInfo);
  });
});
