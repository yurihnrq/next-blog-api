import { User } from '@src/modules/users/interfaces/User';
import { GetUserByIdService } from '@src/modules/users/services/interfaces/GetUserByIdService';

import { usersMock } from '../usersMocks';

export class GetUserByIdServiceMock implements GetUserByIdService {
  execute(_id: string): Promise<User> {
    return Promise.resolve(usersMock[0]);
  }
}
