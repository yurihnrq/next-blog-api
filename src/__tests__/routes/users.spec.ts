import app from '../../config/app.config';
import request from 'supertest';
import prisma from '../../config/prisma.config';
import { users as usersMock } from '../../mocks/users.mock';
import { Prisma } from '@prisma/client';

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation();
});

describe('GET /users/', () => {
  it('should return all users with status 200', async () => {
    prisma.user.findMany = jest.fn().mockResolvedValue(usersMock);

    const {
      status,
      body: { message }
    } = await request(app).get('/users');

    expect(status).toBe(200);
    expect(message).toBe('Users fetched successfully');
  });

  it('should return status 404 when no users found', async () => {
    prisma.user.findMany = jest.fn().mockResolvedValue([]);

    const {
      status,
      body: { message }
    } = await request(app).get('/users');

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
    } = await request(app).get('/users');

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
    } = await request(app).get('/users/1');

    expect(status).toBe(200);
    expect(message).toBe('User fetched successfully');
  });

  it('should return status 404 when no user found', async () => {
    prisma.user.findUnique = jest.fn().mockResolvedValue(null);

    const {
      status,
      body: { message }
    } = await request(app).get('/users/1');

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
    } = await request(app).get('/users/1');

    expect(status).toBe(500);
    expect(message).toBe('Something went wrong, please try again later.');
  });
});

describe('POST /users/', () => {
  it('should create a user and return status 201', async () => {
    prisma.user.create = jest.fn();

    const {
      status,
      body: { message }
    } = await request(app)
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
    } = await request(app)
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
    } = await request(app)
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
      } = await request(app).post('/users').send({});

      expect(status).toBe(400);
      expect(message).toBe('Please provide all required fields');
    });

    it('should return status 400 whit invalid name', async () => {
      const {
        status,
        body: { message }
      } = await request(app)
        .post('/users')
        .send({ ...usersMock[0], name: 'a' });

      expect(status).toBe(400);
      expect(message).toBe('Name must be between 3 and 254 characters');
    });

    it('should return status 400 whit invalid email', async () => {
      const {
        status,
        body: { message }
      } = await request(app)
        .post('/users')
        .send({ ...usersMock[0], email: 'a' });

      expect(status).toBe(400);
      expect(message).toBe('Email must be between 5 and 60 characters');
    });

    it('should return status 400 whit invalid password', async () => {
      const {
        status,
        body: { message }
      } = await request(app)
        .post('/users')
        .send({ ...usersMock[0], password: 'a' });

      expect(status).toBe(400);
      expect(message).toBe('Password must be between 8 and 60 characters');
    });

    it('should return status 400 whit invalid biography', async () => {
      const {
        status,
        body: { message }
      } = await request(app)
        .post('/users')
        .send({ ...usersMock[0], biography: 'a'.repeat(401) });

      expect(status).toBe(400);
      expect(message).toBe('Biography must be less than 400 characters');
    });
  });
});

describe('DELETE /users/:id', () => {
  it('should delete a user and return status 200', async () => {
    prisma.user.delete = jest.fn();

    const {
      status,
      body: { message }
    } = await request(app).delete('/users/1');

    expect(status).toBe(200);
    expect(message).toBe('User deleted successfully');
  });

  it('should return status 400 when a user with provided id does not exist', async () => {
    prisma.user.delete = jest.fn().mockRejectedValue(
      new Prisma.PrismaClientKnownRequestError(
        'No user found',
        'P2025',
        'test',
        {
          target: 'id'
        }
      )
    );

    const {
      status,
      body: { message }
    } = await request(app).delete('/users/1');

    expect(status).toBe(400);
    expect(message).toBe('User with provided id does not exist.');
  });

  it('should catch error and return status 500', async () => {
    prisma.user.delete = jest
      .fn()
      .mockRejectedValue(new Error('Something went wrong'));

    const {
      status,
      body: { message }
    } = await request(app).delete('/users/1');

    expect(status).toBe(500);
    expect(message).toBe('Something went wrong, please try again later.');
  });

  it('should catch others Prisma.PrismaClientKnownRequestError and return status 500', async () => {
    prisma.user.delete = jest.fn().mockRejectedValue(
      new Prisma.PrismaClientKnownRequestError(
        'No user found',
        'test',
        'test',
        {
          cause: 'Test error'
        }
      )
    );

    const {
      status,
      body: { message }
    } = await request(app).delete('/users/1');

    expect(status).toBe(500);
    expect(message).toBe('Test error');
  });
});

describe('PUT /users/:id', () => {
  it('should update a user and return status 200', async () => {
    prisma.user.update = jest.fn();

    const {
      status,
      body: { message }
    } = await request(app)
      .put('/users/1')
      .send({ ...usersMock[0], name: 'John' });

    expect(status).toBe(200);
    expect(message).toBe('User updated successfully');
  });

  it('should return status 400 when a user with provided id does not exist', async () => {
    prisma.user.update = jest.fn().mockRejectedValue(
      new Prisma.PrismaClientKnownRequestError(
        'No user found',
        'P2025',
        'test',
        {
          target: 'id'
        }
      )
    );

    const {
      status,
      body: { message }
    } = await request(app)
      .put('/users/1')
      .send({ ...usersMock[0], name: 'John' });

    expect(status).toBe(400);
    expect(message).toBe('User with provided id does not exist.');
  });

  it('should catch error and return status 500', async () => {
    prisma.user.update = jest
      .fn()
      .mockRejectedValue(new Error('Something went wrong'));

    const {
      status,
      body: { message }
    } = await request(app)
      .put('/users/1')
      .send({ ...usersMock[0], name: 'John' });

    expect(status).toBe(500);
    expect(message).toBe('Something went wrong, please try again later.');
  });

  it('should catch others Prisma.PrismaClientKnownRequestError and return status 500', async () => {
    prisma.user.update = jest.fn().mockRejectedValue(
      new Prisma.PrismaClientKnownRequestError(
        'No user found',
        'test',
        'test',
        {
          cause: 'Test error'
        }
      )
    );

    const {
      status,
      body: { message }
    } = await request(app)
      .put('/users/1')
      .send({ ...usersMock[0], name: 'John' });

    expect(status).toBe(500);
    expect(message).toBe('Test error');
  });
});
