import { User } from '@src/modules/users/interfaces/User';

export interface AuthRepository {
  getUserByEmail(email: string): Promise<User | null>;
}
