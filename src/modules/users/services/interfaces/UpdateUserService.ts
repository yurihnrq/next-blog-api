import { UpdateUserDTO } from '../../interfaces/UpdateUserDTO';

export interface UpdateUserService {
  execute(user: UpdateUserDTO): Promise<void>;
}
