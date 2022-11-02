import APIError from '@src/errors/APIError';
import { User } from '../interfaces/User';
import { UsersRepository } from '../repositories/interfaces/UsersRepository';
import { GetUserByIdService } from './interfaces/GetUserByIdService';

export class GetUserById implements GetUserByIdService {
  #usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.#usersRepository = usersRepository;
  }

  execute = async (id: string): Promise<User> => {
    const existentUser = await this.#usersRepository.getById(id);

    if (!existentUser)
      throw new APIError(404, 'User with provided id does not exist.');

    return existentUser;
  };
}
