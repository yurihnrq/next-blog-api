import { IGetAllUsersService } from '@src/modules/users/services/interfaces/IGetAllUsersService';
import { IUser } from '@src/modules/users/services/interfaces/IUser';
import { usersMock } from '../usersMocks';

export class GetAllUsersServiceMock implements IGetAllUsersService {
  execute(_page: number): Promise<IUser[]> {
    return Promise.resolve(usersMock);
  }
}
