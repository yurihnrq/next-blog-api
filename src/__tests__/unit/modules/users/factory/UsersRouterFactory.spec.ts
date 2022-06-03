import { Router } from 'express';
import { UsersRouterFactory } from '../../../../../modules/users/factory';
import { UsersRouter } from '../../../../../modules/users/routes/UsersRouter';

describe('UsersRouterFactory', () => {
  it('should return an instance of UsersRouterFactory', () => {
    const usersRouterFactory = new UsersRouterFactory();
    expect(usersRouterFactory).toBeInstanceOf(UsersRouterFactory);
  });

  it('should return an instance of UsersRouter', () => {
    const usersRouterFactory = new UsersRouterFactory();
    const usersRouter = usersRouterFactory.buildRouter();
    expect(usersRouter).toBeInstanceOf(UsersRouter);
  });

  it('should return an instance of Router', () => {
    const usersRouterFactory = new UsersRouterFactory();
    const router = usersRouterFactory.router();
    expect(typeof router).toMatch(typeof Router);
  });
});
