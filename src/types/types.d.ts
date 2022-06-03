import { NextFunction, Request, Response, Router } from 'express';

declare global {
  interface IResponseBody<T = unknown> {
    message: string;
    data?: T;
  }

  interface IResponse<T = unknown> {
    status: number;
    body: IResponseBody<T>;
  }

  interface ILoginInfo {
    userId: string;
    loginAt: string;
  }

  interface IRouter {
    router: () => Router;
  }

  interface IRouterFactory extends IRouter {
    buildRouter: () => IRouter;
  }

  type Controller = (
    req: Request,
    res: Response<IResponseBody>,
    next: NextFunction
  ) => Promise<Response<IResponseBody<unknown>>>;

  type Middleware = (
    req: Request,
    res: Response<IResponseBody>,
    next: NextFunction
  ) => Promise<void>;

  type ErrorMiddleware = (
    err: Error | TypeError | APIError,
    req: Request,
    res: Response<IResponseBody>,
    next: NextFunction
  ) => Promise<Response<IResponseBody<unknown>>>;
}
