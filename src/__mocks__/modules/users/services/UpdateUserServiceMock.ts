import { User } from '@src/modules/users/interfaces/User';
import { UpdateUserService } from '@src/modules/users/services/interfaces/UpdateUserService';

export class UpdateUserServiceMock implements UpdateUserService {
  execute(_user: User): Promise<void> {
    return Promise.resolve();
  }
}
