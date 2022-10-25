import APIError from '@src/errors/APIError';
import { PostsRepository } from '../repositories/interface/PostsRepository';
import { IRemovePostService } from './interfaces/IRemovePostService';

export class RemovePostService implements IRemovePostService {
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
