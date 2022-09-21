import { IUser } from '../interfaces/IUser';
import { IUsersRepository } from '../repositories/interfaces/IUsersRepository';
import { IGetAllUsersService } from './interfaces/IGetAllUsersService';

export class GetAllUsersService implements IGetAllUsersService {
  #usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.#usersRepository = usersRepository;
  }

  execute = async (page: number): Promise<IUser[]> => {
    const users = await this.#usersRepository.getAll(page);

    if (users.length <= 0) throw new Error('No users found.');

    return users;
  };
}
