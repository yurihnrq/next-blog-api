import APIError from '@src/errors/APIError';
import { CreateUserDTO } from '../interfaces/CreateUserDTO';
import { UsersRepository } from '../repositories/interfaces/UsersRepository';
import { CreateUserService } from './interfaces/CreateUserService';

export class CreateUser implements CreateUserService {
  #usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.#usersRepository = usersRepository;
  }

  execute = async (data: CreateUserDTO): Promise<void> => {
    const existentUser = await this.#usersRepository.getByEmail(data.email);

    if (existentUser)
      throw new APIError(409, 'User with provided email already exists.');

    await this.#usersRepository.create(data);
  };
}
