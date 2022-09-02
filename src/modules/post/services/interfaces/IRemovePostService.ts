export interface IRemovePostService {
  execute(id: string): Promise<void>;
}
