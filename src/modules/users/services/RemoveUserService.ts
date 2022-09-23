import APIError from '@src/errors/APIError';
import { IUsersRepository } from '../repositories/interfaces/IUsersRepository';
import { IRemoveUserService } from './interfaces/IRemoveUserService';

export class RemoveUserService implements IRemoveUserService {
  #usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.#usersRepository = usersRepository;
  }

  execute = async (id: string): Promise<void> => {
    const existentUser = await this.#usersRepository.getById(id);

    if (!existentUser)
      throw new APIError(404, 'User with provided id does not exist.');

    await this.#usersRepository.remove(id);
  };
}
