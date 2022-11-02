import APIError from '@src/errors/APIError';
import { IUser } from '../interfaces/User';
import { UsersRepository } from '../repositories/interfaces/UsersRepository';
import { GetAllUsersService } from './interfaces/GetAllUsersService';

export class GetAllUsers implements GetAllUsersService {
  #usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.#usersRepository = usersRepository;
  }

  execute = async (page: number): Promise<IUser[]> => {
    const users = await this.#usersRepository.getAll(page);

    if (users.length <= 0) throw new APIError(204, 'No users found.');

    return users;
  };
}
