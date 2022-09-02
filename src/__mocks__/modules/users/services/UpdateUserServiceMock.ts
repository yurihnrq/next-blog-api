import { IUser } from '@src/modules/users/interfaces/IUser';
import { IUpdateUserService } from '@src/modules/users/services/interfaces/IUpdateUserService';

export class UpdateUserServiceMock implements IUpdateUserService {
  execute(_user: IUser): Promise<void> {
    return Promise.resolve();
  }
}
