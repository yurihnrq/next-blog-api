export interface IResponse<T = unknown> {
  message: string;
  data?: T;
}
