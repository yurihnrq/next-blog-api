import { AuthRepository } from '@src/modules/auth/repositories/interfaces/AuthRepository';
import { User } from '@src/modules/users/interfaces/User';

import { usersMock } from '../../users/usersMocks';

export class AuthRepositoryMock implements AuthRepository {
  getByEmail(_email: string): Promise<User | null> {
    return Promise.resolve(usersMock[0]);
  }
}
