import { CreateUserDTO } from '@src/modules/users/interfaces/CreateUserDTO';
import { CreateUserService } from '@src/modules/users/services/interfaces/CreateUserService';

export class CreateUserServiceMock implements CreateUserService {
  execute(_user: CreateUserDTO): Promise<void> {
    return Promise.resolve();
  }
}
