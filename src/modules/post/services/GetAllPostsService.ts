import APIError from '@src/errors/APIError';
import { Post } from '../interfaces/Post';
import { PostsRepository } from '../repositories/interface/PostsRepository';

export class GetAllPostsService {
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
