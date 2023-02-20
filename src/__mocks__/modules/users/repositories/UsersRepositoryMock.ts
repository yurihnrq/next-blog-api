import { CreateUserDTO } from '@src/modules/users/interfaces/CreateUserDTO';
import { User } from '@src/modules/users/interfaces/User';
import { UsersRepository } from '@src/modules/users/repositories/interfaces/UsersRepository';

import { usersMock } from '../usersMocks';

export class UsersRepositoryMock implements UsersRepository {
  getById(_id: string): Promise<User | null> {
    return Promise.resolve(usersMock[0]);
  }
  getByEmail(_email: string): Promise<User | null> {
    return Promise.resolve(usersMock[1]);
  }
  getAll(_page: number): Promise<User[]> {
    return Promise.resolve(usersMock);
  }
  update(_user: User): Promise<User> {
    return Promise.resolve(usersMock[0]);
  }
  remove(_id: string): Promise<void> {
    return Promise.resolve();
  }
  async create(user: CreateUserDTO): Promise<User> {
    return Promise.resolve(user as User);
  }
}
