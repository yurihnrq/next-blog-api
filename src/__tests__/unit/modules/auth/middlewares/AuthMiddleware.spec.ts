import { AuthMiddleware } from '@src/modules/auth/middlewares/AuthMiddleware';
import { IMiddleware } from '@src/types/IMiddleware';
import { requestMock } from '@mocks/express/requestMock';
import { responseMock } from '@mocks/express/responseMock';
import APIError from '@src/errors/APIError';

const authMiddleware: IMiddleware = new AuthMiddleware();

requestMock.headers.authorization = 'Bearer 123';

describe('AuthMiddleware', () => {
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
});
