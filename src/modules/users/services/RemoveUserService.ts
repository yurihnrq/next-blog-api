import { IUsersRepository } from '../repositories/interfaces/IUsersRepository';
import { IRemoveUserService } from './interfaces/IRemoveUserService';

export class RemoveUserService implements IRemoveUserService {
  #usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.#usersRepository = usersRepository;
  }

  execute = async (id: string): Promise<void> => {
    const existentUser = await this.#usersRepository.getById(id);

    if (!existentUser) throw new Error('User with provided id does not exist.');

    await this.#usersRepository.remove(id);
  };
}
