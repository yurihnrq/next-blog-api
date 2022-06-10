export interface IGenerateTokenService {
  execute(email: string, password: string): Promise<string>;
}
