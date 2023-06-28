import APIError from '@src/errors/APIError';
import { User } from '../interfaces/User';
import { UsersRepository } from '../repositories/interfaces/UsersRepository';
import { GetAllUsersService } from './interfaces/GetAllUsersService';

/**
 * Service to get all users.
 */
export class GetAllUsers implements GetAllUsersService {
  #usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.#usersRepository = usersRepository;
  }

  /**
   * Execute the service.
   *
   * @param {number} page The page number.
   * @returns {Promise<User[]>} Promise that resolves to an array of users.
   */
  execute = async (page: number): Promise<User[]> => {
    const users = await this.#usersRepository.getAll(page);

    if (users.length <= 0) throw new APIError(204, 'No users found.');

    return users;
  };
}
