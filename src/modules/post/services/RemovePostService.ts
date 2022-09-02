import { IPostsRepository } from '../repositories/interface/IPostsRepository';
import { IRemovePostService } from './interfaces/IRemovePostService';

export class RemovePostService implements IRemovePostService {
  #postsRepository: IPostsRepository;

  constructor(postsRepository: IPostsRepository) {
    this.#postsRepository = postsRepository;
  }

  async execute(id: string): Promise<void> {
    await this.#postsRepository.getById(id);

    await this.#postsRepository.delete(id);
  }
}
