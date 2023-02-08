import { ValidationMiddleware } from '@src/middlewares/ValidationMiddleware';
import { requestMock } from '@src/__mocks__/express/requestMock';
import { responseMock } from '@src/__mocks__/express/responseMock';
import { ZodSchema } from 'zod';

const next = jest.fn();
const schema: ZodSchema = {
  parse: jest.fn()
} as unknown as ZodSchema;
const validationMiddleware: APIMiddleware = new ValidationMiddleware(schema);

describe('ValidationMiddleware', () => {
  it('should call next function', async () => {
    await validationMiddleware.execute(requestMock, responseMock, next);

    expect(next).toHaveBeenCalled();
  });

  it('should use schema to validate request body', async () => {
    requestMock.body = { name: 'John Doe' };

    await validationMiddleware.execute(requestMock, responseMock, next);

    expect(schema.parse).toHaveBeenCalledWith(requestMock.body);
  });
});
