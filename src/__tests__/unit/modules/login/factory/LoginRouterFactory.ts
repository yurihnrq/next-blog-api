import { Router } from 'express';
import { LoginRouterFactory } from '../../../../../modules/login/factory';
import { LoginRouter } from '../../../../../modules/login/routes/LoginRouter';

describe('LoginRouterFactory', () => {
  it('should return an instance of LoginRouterFactory', () => {
    const loginRouterFactory = new LoginRouterFactory();
    expect(loginRouterFactory).toBeInstanceOf(LoginRouterFactory);
  });

  it('should return an instance of LoginRouter', () => {
    const loginRouterFactory = new LoginRouterFactory();
    const loginRouter = loginRouterFactory.buildRouter();
    expect(loginRouter).toBeInstanceOf(LoginRouter);
  });

  it('should return an instance of Router', () => {
    const loginRouterFactory = new LoginRouterFactory();
    const router = loginRouterFactory.router();
    expect(typeof router).toMatch(typeof Router);
  });
});
