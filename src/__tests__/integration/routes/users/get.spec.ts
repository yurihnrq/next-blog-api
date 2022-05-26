import request from 'supertest';
import app from '../../../../configs/app.config';
import prisma from '../../../../configs/prisma.config';
import { IResponse } from '../../../../types';
import { users as usersMock } from '../../../../mocks/users.mock';

describe('GET /users/', () => {
  it('should return all users with status 200', async () => {
    prisma.user.findMany = jest.fn().mockResolvedValue(usersMock);

    const {
      status,
      body: { message }
    }: IResponse = await request(app).get('/users');

    expect(status).toBe(200);
    expect(message).toBe('Users fetched successfully');
  });

  it('should return status 404 when no users found', async () => {
    prisma.user.findMany = jest.fn().mockResolvedValue([]);

    const {
      status,
      body: { message }
    }: IResponse = await request(app).get('/users');

    expect(status).toBe(404);
    expect(message).toBe('No users found');
  });

  it('should catch error and return status 500', async () => {
    prisma.user.findMany = jest
      .fn()
      .mockRejectedValue(new Error('Something went wrong'));

    const {
      status,
      body: { message }
    }: IResponse = await request(app).get('/users');

    expect(status).toBe(500);
    expect(message).toBe('Something went wrong, please try again later.');
  });

  it('should parse page query', async () => {
    jest.spyOn(global, 'parseInt').mockImplementation(() => 1);

    prisma.user.findMany = jest.fn().mockResolvedValue(usersMock);

    await request(app).get('/users?page=2');

    expect(parseInt).toHaveBeenCalledWith('2');

    jest.spyOn(global, 'parseInt').mockRestore();
  });
});

describe('GET /users/:id', () => {
  it('should return a user with status 200', async () => {
    prisma.user.findUnique = jest.fn().mockResolvedValue(usersMock[0]);

    const {
      status,
      body: { message }
    }: IResponse = await request(app).get('/users/1');

    expect(status).toBe(200);
    expect(message).toBe('User fetched successfully');
  });

  it('should return status 404 when no user found', async () => {
    prisma.user.findUnique = jest.fn().mockResolvedValue(null);

    const {
      status,
      body: { message }
    }: IResponse = await request(app).get('/users/1');

    expect(status).toBe(404);
    expect(message).toBe('No user found');
  });

  it('should catch error and return status 500', async () => {
    prisma.user.findUnique = jest
      .fn()
      .mockRejectedValue(new Error('Something went wrong'));

    const {
      status,
      body: { message }
    }: IResponse = await request(app).get('/users/1');

    expect(status).toBe(500);
    expect(message).toBe('Something went wrong, please try again later.');
  });
});
