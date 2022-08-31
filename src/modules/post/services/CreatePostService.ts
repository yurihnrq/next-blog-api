import { IPost } from '../interfaces/IPost';
import { IPostsRepository } from '../repositories/interface/IPostsRepository';
import { ICreatePostService } from './interfaces/ICreatePostService';

export class CreatePostService implements ICreatePostService {
  #postsRepository: IPostsRepository;

  constructor(postsRepository: IPostsRepository) {
    this.#postsRepository = postsRepository;
  }

  async execute(post: IPost): Promise<void> {
    await this.#postsRepository.create(post);
  }
}
