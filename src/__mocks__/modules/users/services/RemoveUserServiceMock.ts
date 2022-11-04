import { RemoveUserService } from '@src/modules/users/services/interfaces/RemoveUserService';

export class RemoveUserServiceMock implements RemoveUserService {
  execute(_id: string): Promise<void> {
    return Promise.resolve();
  }
}
