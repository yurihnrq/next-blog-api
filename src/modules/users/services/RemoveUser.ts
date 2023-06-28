import APIError from '@src/errors/APIError';
import { UsersRepository } from '../repositories/interfaces/UsersRepository';
import { RemoveUserService } from './interfaces/RemoveUserService';

/**
 * Service to remove a user.
 */
export class RemoveUser implements RemoveUserService {
  #usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.#usersRepository = usersRepository;
  }

  /**
   * Execute the service.
   *
   * @param {string} id The user id.
   * @returns {Promise<void>} Promise that resolves to void when the user is removed.
   */
  execute = async (id: string): Promise<void> => {
    const existentUser = await this.#usersRepository.getById(id);

    if (!existentUser)
      throw new APIError(404, 'User with provided id does not exist.');

    await this.#usersRepository.remove(id);
  };
}
