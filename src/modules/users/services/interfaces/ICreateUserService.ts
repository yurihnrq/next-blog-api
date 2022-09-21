import { IUser } from '../../interfaces/IUser';

export interface ICreateUserService {
  execute(user: IUser): Promise<void>;
}
