import { CreateUserDTO } from '../../interfaces/CreateUserDTO';

export interface CreateUserService {
  execute(user: CreateUserDTO): Promise<void>;
}
