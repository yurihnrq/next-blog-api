import { AuthRepository } from '@src/modules/auth/repositories/interfaces/IAuthRepository';
import { IUser } from '@src/modules/users/interfaces/IUser';

import { usersMock } from '../../users/usersMocks';

export class AuthRepositoryMock implements AuthRepository {
  getByEmail(_email: string): Promise<IUser | null> {
    return Promise.resolve(usersMock[0]);
  }
}
