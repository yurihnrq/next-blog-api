import { IUser } from '../../interfaces/User';

export interface GetAllUsersService {
  execute(page: number): Promise<IUser[]>;
}
