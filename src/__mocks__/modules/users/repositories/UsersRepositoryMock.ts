import { IUsersRepository } from '@src/modules/users/repositories/interfaces/IUsersRepository';
import { IUser } from '@src/modules/users/services/interfaces/IUser';
import { usersMock } from '../usersMocks';

export class UsersRepositoryMock implements IUsersRepository {
  getById(_id: string): Promise<IUser | null> {
    return Promise.resolve(usersMock[0]);
  }
  getByEmail(_email: string): Promise<IUser | null> {
    return Promise.resolve(usersMock[1]);
  }
  getAll(_page: number): Promise<IUser[]> {
    return Promise.resolve(usersMock);
  }
  update(_user: IUser): Promise<IUser> {
    return Promise.resolve(usersMock[0]);
  }
  remove(_id: string): Promise<void> {
    return Promise.resolve();
  }
  async create(user: IUser): Promise<IUser> {
    return Promise.resolve(user);
  }
}
