import { NextFunction, Request, Response } from 'express';

export interface IResponseBody<T = unknown> {
  message: string;
  data?: T;
}

export interface IResponse<T = unknown> {
  status: number;
  body: IResponseBody<T>;
}

export interface ILoginInfo {
  userId: string;
  loginAt: string;
}

export type Controller = (
  req: Request,
  res: Response<IResponseBody>
) => Promise<Response<IResponseBody<unknown>>>;

export type Middleware = (
  req: Request,
  res: Response<IResponseBody>,
  next: NextFunction
) => Promise<Response<IResponseBody<unknown>> | void>;
