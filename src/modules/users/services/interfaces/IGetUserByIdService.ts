import { IUser } from '../../interfaces/IUser';

export interface IGetUserByIdService {
  execute(id: string): Promise<IUser>;
}
