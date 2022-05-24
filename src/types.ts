export interface IResponseBody<T = unknown> {
  message: string;
  data?: T;
}
