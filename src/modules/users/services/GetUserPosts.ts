import { GetUserPostsService } from './interfaces/GetUserPostsService';
import { UsersRepository } from '../repositories/interfaces/UsersRepository';

export class GetUserPosts implements GetUserPostsService {
  #usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.#usersRepository = usersRepository;
  }

  execute = async (authorId: string, page: number) => {
    const userPosts = await this.#usersRepository.getPosts(authorId, page);

    return userPosts;
  };
}
