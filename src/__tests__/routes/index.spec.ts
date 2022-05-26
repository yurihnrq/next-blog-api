import request from 'supertest';
import app from '../../config/app.config';
import { IResponse } from '../../types';

describe('invalid route handling', () => {
  it('should return status 400', async () => {
    const {
      status,
      body: { message }
    }: IResponse = await request(app).post('/invalid-route');

    expect(status).toBe(400);
    expect(message).toBe('Invalid request, please check url and method.');
  });
});
