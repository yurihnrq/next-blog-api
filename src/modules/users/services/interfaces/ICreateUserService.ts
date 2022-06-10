import { IUser } from './IUser';

export interface ICreateUserService {
  execute(user: IUser): Promise<void>;
}
