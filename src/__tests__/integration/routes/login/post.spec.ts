import request from 'supertest';
import bcrypt from 'bcrypt';
import app from '../../../../configs/app.config';
import prisma from '../../../../configs/prisma.config';
import { users as usersMock } from '../../../../mocks/users.mock';

afterEach(() => {
  jest.resetAllMocks();
});

describe('POST /login', () => {
  it('should return a token', async () => {
    prisma.user.findUnique = jest.fn().mockResolvedValue(usersMock[0]);
    jest.spyOn(bcrypt, 'compareSync').mockImplementation(() => true);

    const {
      status,
      body: { data }
    }: IResponse = await request(app).post('/login').send({
      email: 'test@mail.com',
      password: 'password'
    });

    expect(status).toBe(200);
    expect(data).toBeTruthy();
  });

  it('should return status 400 if email is not provided', async () => {
    const {
      status,
      body: { message }
    }: IResponse = await request(app).post('/login').send({
      password: 'password'
    });

    expect(status).toBe(400);
    expect(message).toBe('Please provide all required fields');
  });

  it('should return status 400 if password is not provided', async () => {
    const {
      status,
      body: { message }
    }: IResponse = await request(app).post('/login').send({
      email: 'test@mail.com'
    });

    expect(status).toBe(400);
    expect(message).toBe('Please provide all required fields');
  });

  it('should return status 401 if user not found', async () => {
    prisma.user.findUnique = jest.fn().mockResolvedValue(null);

    const {
      status,
      body: { message }
    }: IResponse = await request(app).post('/login').send({
      email: 'test@mail.com',
      password: 'password'
    });

    expect(status).toBe(401);
    expect(message).toBe('Invalid credentials');
  });

  it('should return status 401 if password is invalid', async () => {
    prisma.user.findUnique = jest.fn().mockResolvedValue(usersMock[0]);
    jest.spyOn(bcrypt, 'compareSync').mockImplementation(() => false);

    const {
      status,
      body: { message }
    }: IResponse = await request(app).post('/login').send({
      email: 'test@mail.com',
      password: 'password'
    });

    expect(status).toBe(401);
    expect(message).toBe('Invalid credentials');
  });

  it('should return status 500 if catch an error', async () => {
    prisma.user.findUnique = jest
      .fn()
      .mockRejectedValue(new Error('Something went wrong'));

    const {
      status,
      body: { message }
    }: IResponse = await request(app).post('/login').send({
      email: 'test@mail.com',
      password: 'password'
    });

    expect(status).toBe(500);
    expect(message).toBe('Something went wrong, please try again later.');
  });
});
