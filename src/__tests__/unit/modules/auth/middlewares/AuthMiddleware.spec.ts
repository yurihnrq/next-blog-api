import { AuthMiddleware } from '@src/modules/auth/middlewares/AuthMiddleware';
import { IMiddleware } from '@src/types/IMiddleware';
import { requestMock } from '@mocks/express/requestMock';
import { responseMock } from '@mocks/express/responseMock';

const authMiddleware: IMiddleware = new AuthMiddleware();

describe('AuthMiddleware', () => {
  it('should call next function', async () => {
    const next = jest.fn();

    await authMiddleware.execute(requestMock, responseMock, next);

    expect(next).toHaveBeenCalled();
  });
});
