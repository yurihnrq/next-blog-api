import { IUpdateUserService } from '@src/modules/users/services/interfaces/IUpdateUserService';
import { IUser } from '@src/modules/users/services/interfaces/IUser';

export class UpdateUserServiceMock implements IUpdateUserService {
  execute(_user: IUser): Promise<void> {
    return Promise.resolve();
  }
}
