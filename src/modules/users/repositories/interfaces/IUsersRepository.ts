import { IUser } from '../../services/interfaces/IUser';

export interface IUsersRepository {
  getById(id: string): Promise<IUser>;
  getByEmail(email: string): Promise<IUser>;
  getAll(page: number): Promise<IUser[]>;
  create(user: IUser): Promise<IUser>;
  update(user: IUser): Promise<IUser>;
  remove(id: string): Promise<void>;
}
