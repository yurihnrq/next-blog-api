import APIError from '@src/errors/APIError';
import { PostsRepository } from '../repositories/interfaces/PostsRepository';
import { RemovePostService } from './interfaces/RemovePostService';

export class RemovePost implements RemovePostService {
  #postsRepository: PostsRepository;

  constructor(postsRepository: PostsRepository) {
    this.#postsRepository = postsRepository;
  }

  async execute(id: string): Promise<void> {
    const post = await this.#postsRepository.getById(id);

    if (!post) throw new APIError(404, 'Post with provided id does not exist.');

    await this.#postsRepository.remove(id);
  }
}
