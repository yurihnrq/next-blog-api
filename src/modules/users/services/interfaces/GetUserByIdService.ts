import { IUser } from '../../interfaces/User';

export interface GetUserByIdService {
  execute(id: string): Promise<IUser>;
}
