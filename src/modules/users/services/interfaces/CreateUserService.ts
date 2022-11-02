import { IUser } from '../../interfaces/User';

export interface CreateUserService {
  execute(user: IUser): Promise<void>;
}
