import { IUser } from '@src/modules/users/interfaces/IUser';

export interface IAuthRepository {
  getByEmail(email: string): Promise<IUser | null>;
}
