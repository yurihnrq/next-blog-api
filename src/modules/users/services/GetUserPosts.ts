import { GetUserPostsService } from './interfaces/GetUserPostsService';
import { UsersRepository } from '../repositories/interfaces/UsersRepository';
import APIError from '@src/errors/APIError';
import { Post } from '@src/modules/common/interfaces/Post';

/**
 * Service to get all posts from a user.
 */
export class GetUserPosts implements GetUserPostsService {
  #usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.#usersRepository = usersRepository;
  }

  /**
   * Execute the service.
   *
   * @param {string} authorId The author id.
   * @param {number} page The page number.
   * @returns {Promise<Post[]>} Promise that resolves to an array of posts.
   */
  execute = async (authorId: string, page: number): Promise<Post[]> => {
    const user = await this.#usersRepository.getById(authorId);

    if (!user) {
      throw new APIError(404, 'Provided author id is not valid.');
    }

    const userPosts = await this.#usersRepository.getPosts(authorId, page);

    if (userPosts.length <= 0) {
      throw new APIError(204, 'No posts found for this user.');
    }

    return userPosts;
  };
}
