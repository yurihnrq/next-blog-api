import { IUser } from '@src/modules/users/interfaces/IUser';
import { ICreateUserService } from '@src/modules/users/services/interfaces/ICreateUserService';

export class CreateUserServiceMock implements ICreateUserService {
  execute(_user: IUser): Promise<void> {
    return Promise.resolve();
  }
}
