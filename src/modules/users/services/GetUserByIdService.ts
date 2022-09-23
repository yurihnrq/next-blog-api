import APIError from '@src/errors/APIError';
import { IUser } from '../interfaces/IUser';
import { IUsersRepository } from '../repositories/interfaces/IUsersRepository';
import { IGetUserByIdService } from './interfaces/IGetUserByIdService';

export class GetUserByIdService implements IGetUserByIdService {
  #usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.#usersRepository = usersRepository;
  }

  execute = async (id: string): Promise<IUser> => {
    const existentUser = await this.#usersRepository.getById(id);

    if (!existentUser)
      throw new APIError(404, 'User with provided id does not exist.');

    return existentUser;
  };
}
