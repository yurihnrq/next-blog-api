import { ValidationMiddleware } from '@src/middlewares/ValidationMiddleware';
import { requestMock } from '@src/__mocks__/express/requestMock';
import { responseMock } from '@src/__mocks__/express/responseMock';

const next = jest.fn();
const validationMiddleware: APIMiddleware = new ValidationMiddleware();

describe('ValidationMiddleware', () => {
  it('should call next function', async () => {
    await validationMiddleware.execute(requestMock, responseMock, next);

    expect(next).toHaveBeenCalled();
  });
});
