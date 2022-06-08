import { IUser } from './interfaces/IUser';
import { IUsersRepository } from '../repositories/interfaces/IUsersRepository';
import { IUpdateUserService } from './interfaces/IUpdateUserService';

export class UpdateUserService implements IUpdateUserService {
  #usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.#usersRepository = usersRepository;
  }

  execute = async (data: IUser): Promise<void> => {
    const existentUser = await this.#usersRepository.getById(data.id as string);

    if (!existentUser) throw new Error('User with provided id does not exist.');

    const userWithEmail = await this.#usersRepository.getByEmail(data.email);

    if (userWithEmail && userWithEmail.id !== data.id)
      throw new Error('User with provided email already exists.');

    await this.#usersRepository.update(data);
  };
}
