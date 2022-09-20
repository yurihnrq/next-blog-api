import { ICreatePostDTO } from '../interfaces/ICreatePostDTO';
import { IPostsRepository } from '../repositories/interface/IPostsRepository';
import { ICreatePostService } from './interfaces/ICreatePostService';

export class CreatePostService implements ICreatePostService {
  #postsRepository: IPostsRepository;

  constructor(postsRepository: IPostsRepository) {
    this.#postsRepository = postsRepository;
  }

  async execute(post: ICreatePostDTO): Promise<void> {
    await this.#postsRepository.create(post);
  }
}
