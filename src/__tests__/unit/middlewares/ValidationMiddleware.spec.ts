import APIError from '@src/errors/APIError';
import { ValidationMiddleware } from '@src/middlewares/ValidationMiddleware';
import { requestMock } from '@src/__mocks__/express/requestMock';
import { responseMock } from '@src/__mocks__/express/responseMock';
import { z } from 'zod';

const next = jest.fn();
const schema = z.object({
  name: z.string({
    invalid_type_error: 'Invalid request.'
  })
});
const validationMiddleware: APIMiddleware = new ValidationMiddleware(schema);

describe('ValidationMiddleware', () => {
  it('should call next function', async () => {
    requestMock.body = { name: 'John Doe' };

    await validationMiddleware.execute(requestMock, responseMock, next);

    expect(next).toHaveBeenCalled();
  });

  it('should use schema to validate request body', async () => {
    jest.spyOn(schema, 'parse');
    requestMock.body = { name: 'John Doe' };

    await validationMiddleware.execute(requestMock, responseMock, next);

    expect(schema.parse).toHaveBeenCalledWith(requestMock.body);
  });

  it('should throw an APIError if schema throws an exception', async () => {
    requestMock.body = { name: 123 };

    try {
      await validationMiddleware.execute(requestMock, responseMock, next);
    } catch (error) {
      expect(error).toBeInstanceOf(APIError);
      expect((error as APIError).status).toBe(400);
      expect((error as APIError).message).toBe('Invalid request.');
    }

    expect.assertions(3);
  });
});
