import { User } from '../../interfaces/User';

export interface UsersRepository {
  getById(id: string): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  getAll(page: number): Promise<User[]>;
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  remove(id: string): Promise<void>;
}
