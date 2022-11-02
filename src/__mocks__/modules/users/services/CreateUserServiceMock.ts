import { IUser } from '@src/modules/users/interfaces/User';
import { CreateUserService } from '@src/modules/users/services/interfaces/CreateUserService';

export class CreateUserServiceMock implements CreateUserService {
  execute(_user: IUser): Promise<void> {
    return Promise.resolve();
  }
}
