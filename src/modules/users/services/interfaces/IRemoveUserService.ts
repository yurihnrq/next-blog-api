export interface IRemoveUserService {
  execute(id: string): Promise<void>;
}
