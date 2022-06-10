import { IUser } from './IUser';

export interface IUpdateUserService {
  execute(user: IUser): Promise<void>;
}
