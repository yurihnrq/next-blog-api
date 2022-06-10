import { IRemoveUserService } from '@src/modules/users/services/interfaces/IRemoveUserService';

export class RemoveUserServiceMock implements IRemoveUserService {
  execute(_id: string): Promise<void> {
    return Promise.resolve();
  }
}
