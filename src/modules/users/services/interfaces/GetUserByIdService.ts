import { User } from '../../interfaces/User';

export interface GetUserByIdService {
  execute(id: string): Promise<User>;
}
