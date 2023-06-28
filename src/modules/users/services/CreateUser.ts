import APIError from '@src/errors/APIError';
import { CreateUserDTO } from '../interfaces/CreateUserDTO';
import { UsersRepository } from '../repositories/interfaces/UsersRepository';
import { CreateUserService } from './interfaces/CreateUserService';

/**
 * Service to create a new user.
 */
export class CreateUser implements CreateUserService {
  #usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.#usersRepository = usersRepository;
  }

  /**
   * Execute the service.
   *
   * @param {CreateUserDTO} data The data to create a new user.
   * @returns {Promise<void>} Promise that resolves to void when the user is created.
   */
  execute = async (data: CreateUserDTO): Promise<void> => {
    const existentUser = await this.#usersRepository.getByEmail(data.email);

    if (existentUser)
      throw new APIError(409, 'User with provided email already exists.');

    await this.#usersRepository.create(data);
  };
}
