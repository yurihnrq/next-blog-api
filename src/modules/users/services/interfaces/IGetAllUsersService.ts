import { IUser } from '../../interfaces/IUser';

export interface IGetAllUsersService {
  execute(page: number): Promise<IUser[]>;
}
