import { User } from '@src/modules/users/interfaces/User';

export interface AuthRepository {
  getByEmail(email: string): Promise<User | null>;
}
