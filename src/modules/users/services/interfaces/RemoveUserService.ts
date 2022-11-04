export interface RemoveUserService {
  execute(id: string): Promise<void>;
}
