export interface ITokenProvider {
  generateToken<T extends object>(payload: T): Promise<string>;
  verifyToken<T extends object>(token: string): Promise<T>;
}
