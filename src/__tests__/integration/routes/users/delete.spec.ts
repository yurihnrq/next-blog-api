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

describe('DELETE /users/:id', () => {
  it('should delete a user and return status 200', async () => {
    prisma.user.delete = jest.fn();
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
      .delete('/users/1')
      .set('Authorization', 'Bearer 123');

    expect(status).toBe(200);
    expect(message).toBe('User deleted successfully');
  });

  it('should return status 400 if user is not found', async () => {
    prisma.user.delete = jest.fn().mockImplementation(() => {
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
      .delete('/users/2')
      .set('Authorization', 'Bearer 123');

    expect(status).toBe(400);
    expect(message).toBe('User with provided id does not exist.');
  });

  it('should return status 500 with error', async () => {
    prisma.user.delete = jest.fn().mockImplementation(() => {
      throw new Error('Database error');
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
      .delete('/users/2')
      .set('Authorization', 'Bearer 123');

    expect(status).toBe(500);
    expect(message).toBe('Something went wrong, please try again later.');
  });
});
