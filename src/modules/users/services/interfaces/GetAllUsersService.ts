import { User } from '../../interfaces/User';

export interface GetAllUsersService {
  execute(page: number): Promise<User[]>;
}
