import request from 'supertest';
import { Prisma } from '@prisma/client';
import app from '../../../../configs/app.config';
import prisma from '../../../../configs/prisma.config';
import { IResponse } from '../../../../types';
import { users as usersMock } from '../../../../mocks/users.mock';

describe('POST /users/', () => {
  it('should create a user and return status 201', async () => {
    prisma.user.create = jest.fn();

    const {
      status,
      body: { message }
    }: IResponse = await request(app)
      .post('/users')
      .send({ ...usersMock[0] });

    expect(status).toBe(201);
    expect(message).toBe('User created successfully');
  });

  it('should catch error when create user with registered email and return status 422', async () => {
    prisma.user.create = jest.fn().mockRejectedValue(
      new Prisma.PrismaClientKnownRequestError(
        'Email already exists',
        'P2002',
        'test',
        {
          target: 'email'
        }
      )
    );

    const {
      status,
      body: { message }
    }: IResponse = await request(app)
      .post('/users')
      .send({ ...usersMock[0] });

    expect(status).toBe(422);
    expect(message).toBe('User with provided email already exists');
  });

  it('should catch error and return status 500', async () => {
    prisma.user.create = jest
      .fn()
      .mockRejectedValue(new Error('Something went wrong'));

    const {
      status,
      body: { message }
    }: IResponse = await request(app)
      .post('/users')
      .send({ ...usersMock[0] });

    expect(status).toBe(500);
    expect(message).toBe('Something went wrong, please try again later.');
  });

  describe('POST /users/ middleware handling', () => {
    it('should return status 400 when no required fields provided', async () => {
      const {
        status,
        body: { message }
      }: IResponse = await request(app).post('/users').send({});

      expect(status).toBe(400);
      expect(message).toBe('Please provide all required fields');
    });

    it('should return status 400 whit invalid name', async () => {
      const {
        status,
        body: { message }
      }: IResponse = await request(app)
        .post('/users')
        .send({ ...usersMock[0], name: 'a' });

      expect(status).toBe(400);
      expect(message).toBe('Name must be between 3 and 254 characters');
    });

    it('should return status 400 whit invalid email', async () => {
      const {
        status,
        body: { message }
      }: IResponse = await request(app)
        .post('/users')
        .send({ ...usersMock[0], email: 'a' });

      expect(status).toBe(400);
      expect(message).toBe('Email must be between 5 and 60 characters');
    });

    it('should return status 400 whit invalid password', async () => {
      const {
        status,
        body: { message }
      }: IResponse = await request(app)
        .post('/users')
        .send({ ...usersMock[0], password: 'a' });

      expect(status).toBe(400);
      expect(message).toBe('Password must be between 8 and 60 characters');
    });

    it('should return status 400 whit invalid biography', async () => {
      const {
        status,
        body: { message }
      }: IResponse = await request(app)
        .post('/users')
        .send({ ...usersMock[0], biography: 'a'.repeat(401) });

      expect(status).toBe(400);
      expect(message).toBe('Biography must be less than 400 characters');
    });
  });
});
