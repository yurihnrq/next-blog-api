import { ICreateUserService } from '@src/modules/users/services/interfaces/ICreateUserService';
import { IUser } from '@src/modules/users/services/interfaces/IUser';

export class CreateUserServiceMock implements ICreateUserService {
  execute(_user: IUser): Promise<void> {
    return Promise.resolve();
  }
}
