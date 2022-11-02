import { IUser } from '../../interfaces/User';

export interface UpdateUserService {
  execute(user: IUser): Promise<void>;
}
