export interface IGenerateTokenService {
  execute(userId: string): Promise<string>;
}
