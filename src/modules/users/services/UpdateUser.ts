import APIError from '@src/errors/APIError';
import { UpdateUserDTO } from '../interfaces/UpdateUserDTO';
import { UsersRepository } from '../repositories/interfaces/UsersRepository';
import { UpdateUserService } from './interfaces/UpdateUserService';

export class UpdateUser implements UpdateUserService {
  #usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.#usersRepository = usersRepository;
  }

  execute = async (data: UpdateUserDTO): Promise<void> => {
    const existentUser = await this.#usersRepository.getById(data.id);

    if (!existentUser)
      throw new APIError(404, 'User with provided id does not exist.');

    const userWithEmail = await this.#usersRepository.getByEmail(data.email);

    if (userWithEmail && userWithEmail.id !== data.id)
      throw new APIError(409, 'User with provided email already exists.');

    await this.#usersRepository.update(data);
  };
}
