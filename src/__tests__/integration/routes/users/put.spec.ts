import request from 'supertest';
import { Prisma } from '@prisma/client';
import app from '../../../../configs/app.config';
import prisma from '../../../../configs/prisma.config';
import { IResponse } from '../../../../types';
import { users as usersMock } from '../../../../mocks/users.mock';
import jwt from 'jsonwebtoken';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('PUT /users/:id', () => {
  it('should update a user and return status 200', async () => {
    prisma.user.update = jest.fn();
    jest.spyOn(jwt, 'verify').mockImplementation(() => {
      return {
        userId: usersMock[0].id,
        loginAt: new Date()
      };
    });

    const {
      status,
      body: { message }
    }: IResponse = await request(app)
      .put('/users/1')
      .set('Authorization', 'Bearer 123')
      .send({ ...usersMock[0] });

    expect(status).toBe(200);
    expect(message).toBe('User updated successfully');
  });

  it('should return status 400 if user is not found', async () => {
    prisma.user.update = jest.fn().mockImplementation(() => {
      throw new Prisma.PrismaClientKnownRequestError(
        'User not found',
        'P2025',
        'test',
        {
          caus: 'Invalid id'
        }
      );
    });
    jest.spyOn(jwt, 'verify').mockImplementation(() => {
      return {
        userId: usersMock[0].id,
        loginAt: new Date()
      };
    });

    const {
      status,
      body: { message }
    }: IResponse = await request(app)
      .put('/users/2')
      .set('Authorization', 'Bearer 123')
      .send({ ...usersMock[0] });

    expect(status).toBe(400);
    expect(message).toBe('User with provided id does not exist.');
  });

  it('should return status 500 with error', async () => {
    prisma.user.update = jest.fn().mockImplementation(() => {
      throw new Error('Request error');
    });
    jest.spyOn(jwt, 'verify').mockImplementation(() => {
      return {
        userId: usersMock[0].id,
        loginAt: new Date()
      };
    });

    const {
      status,
      body: { message }
    }: IResponse = await request(app)
      .put('/users/2')
      .set('Authorization', 'Bearer 123')
      .send({ ...usersMock[0] });

    expect(status).toBe(500);
    expect(message).toBe('Something went wrong, please try again later.');
  });

  it('should return status 401 if token is invalid', async () => {
    jest.spyOn(jwt, 'verify').mockImplementation(() => {
      throw new Error('Token is invalid');
    });

    const {
      status,
      body: { message }
    }: IResponse = await request(app)
      .put('/users/2')
      .set('Authorization', 'Bearer 123')
      .send({ ...usersMock[0] });

    expect(status).toBe(401);
    expect(message).toBe('Unauthorized request');
  });

  it('should return status 401 no token is provided', async () => {
    const {
      status,
      body: { message }
    }: IResponse = await request(app)
      .put('/users/2')
      .send({ ...usersMock[0] });

    expect(status).toBe(401);
    expect(message).toBe('Unauthorized request');
  });
});
