import { IUser } from './IUser';

export interface IGetAllUsersService {
  execute(page: number): Promise<IUser[]>;
}
