import APIError from '@src/errors/APIError';
import { Post } from '../interfaces/Post';
import { PostsRepository } from '../repositories/interfaces/PostsRepository';
import { GetAllPostsService } from './interfaces/GetAllPostsService';

export class GetAllPosts implements GetAllPostsService {
  #postsRepository: PostsRepository;

  constructor(postsRepository: PostsRepository) {
    this.#postsRepository = postsRepository;
  }

  async execute(page: number): Promise<Post[]> {
    const posts = await this.#postsRepository.getAll(page);

    if (posts.length <= 0) throw new APIError(404, 'No posts found.');

    return posts;
  }
}
