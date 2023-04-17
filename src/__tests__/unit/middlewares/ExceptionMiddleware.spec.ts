import APIError from '@src/errors/APIError';
import { ExceptionMiddleware } from '@src/middlewares/ExceptionMiddleware';
import { requestMock } from '@src/__mocks__/express/requestMock';
import { responseMock } from '@src/__mocks__/express/responseMock';

const exceptionMiddleware = new ExceptionMiddleware();
const next = jest.fn();

describe('Exception Middleware', () => {
  it('should return the APIError as a response if error is typeof APIError', async () => {
    jest.spyOn(responseMock, 'status');
    jest.spyOn(responseMock, 'json');
    const apiErr = new APIError(400, 'Invalid data');

    await exceptionMiddleware.execute(apiErr, requestMock, responseMock, next);

    expect(responseMock.status).toHaveBeenCalledWith(400);
    expect(responseMock.json).toHaveBeenCalledWith({
      success: false,
      message: apiErr.message,
      data: null
    });
  });

  it('should return a defined response if the error raised is not an APIError', async () => {
    jest.spyOn(responseMock, 'status');
    jest.spyOn(responseMock, 'json');
    const apiErr = new Error('NullPointerException');

    const definedError = new APIError(500, 'Server Internal Error, try again.');

    await exceptionMiddleware.execute(apiErr, requestMock, responseMock, next);

    expect(responseMock.status).toHaveBeenCalledWith(500);
    expect(responseMock.json).toHaveBeenCalledWith({
      success: false,
      message: definedError.message,
      data: null
    });
  });

  it('should log the error if the environment is not test', async () => {
    process.env.NODE_ENV = 'development';
    jest.spyOn(console, 'error').mockImplementation();
    const definedError = new APIError(500, 'Server Internal Error, try again.');

    await exceptionMiddleware.execute(
      definedError,
      requestMock,
      responseMock,
      next
    );

    expect(console.error).toHaveBeenCalledWith(definedError);
  });
});
