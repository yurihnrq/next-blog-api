import { IUser } from './IUser';

export interface IUsersServices {
  getById: (id: string) => Promise<IUser | null>;
  getByEmail: (email: string) => Promise<IUser | null>;
  getAll: (page: number) => Promise<IUser[]>;
  create: (user: IUser) => Promise<IUser>;
  update: (user: IUser) => Promise<IUser>;
  remove: (id: string) => Promise<IUser>;
}
