import APIError from '@src/errors/APIError';
import { ExceptionMiddleware } from '@src/middlewares/ExceptionMiddleware';
import { requestMock } from '@src/__mocks__/express/requestMock';
import { responseMock } from '@src/__mocks__/express/responseMock';

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date('13-06-2022'));
});

const exceptionMiddleware = new ExceptionMiddleware();

describe('Exception Middleware', () => {
  it('should return the APIError as a response if error is typeof APIError', async () => {
    const apiErr = new APIError(400, 'Invalid data');
    const next = jest.fn();

    await exceptionMiddleware.execute(apiErr, requestMock, responseMock, next);

    expect(responseMock.status).toHaveBeenCalledWith(400);
    expect(responseMock.json).toHaveBeenCalledWith({
      success: false,
      message: 'An error has occurred.',
      data: apiErr
    });
  });

  it('should return a defined response if the error raised isn\'t an APIError', async () => {
    const apiErr = new Error('NullPointerException');
    const next = jest.fn();

    const definedError = new APIError(500, 'Server Internal Error, try again.');

    await exceptionMiddleware.execute(apiErr, requestMock, responseMock, next);

    expect(responseMock.status).toHaveBeenCalledWith(500);
    expect(responseMock.json).toHaveBeenCalledWith({
      success: false,
      message: 'An error has occurred.',
      data: definedError
    });
  });
});
