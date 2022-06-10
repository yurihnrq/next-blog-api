import { IAuthRepository } from '@src/modules/auth/repositories/interfaces/IAuthRepository';
import { IUser } from '@src/modules/users/services/interfaces/IUser';
import { usersMock } from '../../users/usersMocks';

export class AuthRepositoryMock implements IAuthRepository {
  getByEmail(_email: string): Promise<IUser | null> {
    return Promise.resolve(usersMock[0]);
  }
}
