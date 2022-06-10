import { IUser } from './interfaces/IUser';
import { IUsersRepository } from '../repositories/interfaces/IUsersRepository';
import { ICreateUserService } from './interfaces/ICreateUserService';

export class CreateUserService implements ICreateUserService {
  #usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.#usersRepository = usersRepository;
  }

  execute = async (data: IUser): Promise<void> => {
    const existentUser = await this.#usersRepository.getByEmail(data.email);

    if (existentUser)
      throw new Error('User with provided email already exists.');

    await this.#usersRepository.create(data);
  };
}
