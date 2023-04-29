import { Post } from '@src/modules/common/interfaces/Post';
import { CreateUserDTO } from '../../interfaces/CreateUserDTO';
import { UpdateUserDTO } from '../../interfaces/UpdateUserDTO';
import { User } from '../../interfaces/User';

export interface UsersRepository {
  getById(id: string): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  getAll(page: number): Promise<User[]>;
  create(user: CreateUserDTO): Promise<User>;
  update(user: UpdateUserDTO): Promise<User>;
  remove(id: string): Promise<void>;
  getPosts(id: string): Promise<Post[]>;
}
