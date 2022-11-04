import APIError from '@src/errors/APIError';
import { UsersRepository } from '../repositories/interfaces/UsersRepository';
import { RemoveUserService } from './interfaces/RemoveUserService';

export class RemoveUser implements RemoveUserService {
  #usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.#usersRepository = usersRepository;
  }

  execute = async (id: string): Promise<void> => {
    const existentUser = await this.#usersRepository.getById(id);

    if (!existentUser)
      throw new APIError(404, 'User with provided id does not exist.');

    await this.#usersRepository.remove(id);
  };
}
