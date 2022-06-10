import { IUser } from '@src/modules/users/services/interfaces/IUser';

export interface IAuthRepository {
  getByEmail(email: string): Promise<IUser | null>;
}
