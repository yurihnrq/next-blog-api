import { User } from '@src/modules/users/interfaces/User';
import { GetAllUsersService } from '@src/modules/users/services/interfaces/GetAllUsersService';

import { usersMock } from '../usersMocks';

export class GetAllUsersServiceMock implements GetAllUsersService {
  execute(_page: number): Promise<User[]> {
    return Promise.resolve(usersMock);
  }
}
