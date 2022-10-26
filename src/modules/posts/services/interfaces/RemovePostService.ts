export interface RemovePostService {
  execute(id: string): Promise<void>;
}
