import { AuthMiddleware } from '@src/modules/auth/middlewares/AuthMiddleware';
import { IMiddleware } from '@src/types/IMiddleware';
import { requestMock } from '@mocks/express/requestMock';
import { responseMock } from '@mocks/express/responseMock';
import APIError from '@src/errors/APIError';
import { TokenProviderMock } from '@src/__mocks__/providers/TokenProviderMock';
import { ITokenProvider } from '@src/providers/interfaces/ITokenProvider';

const tokenProvider: ITokenProvider = new TokenProviderMock();
const authMiddleware: IMiddleware = new AuthMiddleware(tokenProvider);

describe('AuthMiddleware', () => {
  beforeEach(() => {
    requestMock.headers.authorization = 'Bearer 123';
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
    const splitted = requestMock.headers.authorization?.split(' ')[1];
    jest.spyOn(tokenProvider, 'verifyToken');

    await authMiddleware.execute(requestMock, responseMock, jest.fn());

    expect(tokenProvider.verifyToken).toHaveBeenCalledWith(splitted);
  });
});
