import { IPost } from '../interfaces/IPost';
import { IPostsRepository } from '../repositories/interface/IPostsRepository';
import { IUpdatePostService } from './interfaces/IUpdatePostService';

export class UpdatePostService implements IUpdatePostService {
  #postsRepository: IPostsRepository;

  constructor(postsRepository: IPostsRepository) {
    this.#postsRepository = postsRepository;
  }

  async execute(data: IPost): Promise<void> {
    await this.#postsRepository.update(data);
  }
}
