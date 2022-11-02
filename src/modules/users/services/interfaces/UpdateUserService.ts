import { User } from '../../interfaces/User';

export interface UpdateUserService {
  execute(user: User): Promise<void>;
}
