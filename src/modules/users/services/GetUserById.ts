import APIError from '@src/errors/APIError';
import { User } from '../interfaces/User';
import { UsersRepository } from '../repositories/interfaces/UsersRepository';
import { GetUserByIdService } from './interfaces/GetUserByIdService';

/**
 * Service to get a user by id.
 */
export class GetUserById implements GetUserByIdService {
  #usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.#usersRepository = usersRepository;
  }

  /**
   * Execute the service.
   *
   * @param {string} id The user id.
   *
   * @returns {Promise<User>} Promise that resolves to the user.
   */
  execute = async (id: string): Promise<User> => {
    const existentUser = await this.#usersRepository.getById(id);

    if (!existentUser)
      throw new APIError(404, 'User with provided id does not exist.');

    return existentUser;
  };
}
