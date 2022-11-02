import { IUser } from '../../interfaces/User';

export interface UsersRepository {
  getById(id: string): Promise<IUser | null>;
  getByEmail(email: string): Promise<IUser | null>;
  getAll(page: number): Promise<IUser[]>;
  create(user: IUser): Promise<IUser>;
  update(user: IUser): Promise<IUser>;
  remove(id: string): Promise<void>;
}
