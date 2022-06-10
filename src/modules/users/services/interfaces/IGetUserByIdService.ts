import { IUser } from './IUser';

export interface IGetUserByIdService {
  execute(id: string): Promise<IUser>;
}
