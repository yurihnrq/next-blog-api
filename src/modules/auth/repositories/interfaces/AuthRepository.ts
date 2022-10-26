import { IUser } from '@src/modules/users/interfaces/IUser';

export interface AuthRepository {
  getByEmail(email: string): Promise<IUser | null>;
}
