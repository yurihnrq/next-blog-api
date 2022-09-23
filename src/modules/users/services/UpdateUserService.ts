import APIError from '@src/errors/APIError';
import { IUser } from '../interfaces/IUser';
import { IUsersRepository } from '../repositories/interfaces/IUsersRepository';
import { IUpdateUserService } from './interfaces/IUpdateUserService';

export class UpdateUserService implements IUpdateUserService {
  #usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.#usersRepository = usersRepository;
  }

  execute = async (data: IUser): Promise<void> => {
    const existentUser = await this.#usersRepository.getById(data.id as string);

    if (!existentUser)
      throw new APIError(404, 'User with provided id does not exist.');

    const userWithEmail = await this.#usersRepository.getByEmail(data.email);

    if (userWithEmail && userWithEmail.id !== data.id)
      throw new APIError(409, 'User with provided email already exists.');

    await this.#usersRepository.update(data);
  };
}
