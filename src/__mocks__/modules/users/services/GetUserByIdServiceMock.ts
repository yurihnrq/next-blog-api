import { IUser } from '@src/modules/users/interfaces/IUser';
import { IGetUserByIdService } from '@src/modules/users/services/interfaces/IGetUserByIdService';

import { usersMock } from '../usersMocks';

export class GetUserByIdServiceMock implements IGetUserByIdService {
  execute(_id: string): Promise<IUser> {
    return Promise.resolve(usersMock[0]);
  }
}
