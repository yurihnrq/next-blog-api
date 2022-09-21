import { IUser } from '../../interfaces/IUser';

export interface IUpdateUserService {
  execute(user: IUser): Promise<void>;
}
