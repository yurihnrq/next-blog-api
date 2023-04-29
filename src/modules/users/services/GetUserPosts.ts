import { GetUserPostsService } from './interfaces/GetUserPostsService';
import { UsersRepository } from '../repositories/interfaces/UsersRepository';
import APIError from '@src/errors/APIError';

export class GetUserPosts implements GetUserPostsService {
  #usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.#usersRepository = usersRepository;
  }

  execute = async (authorId: string, page: number) => {
    const userPosts = await this.#usersRepository.getPosts(authorId, page);

    if (userPosts.length <= 0) {
      throw new APIError(204, 'No posts found for this user.');
    }

    return userPosts;
  };
}
