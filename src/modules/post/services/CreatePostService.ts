import { CreatePostDTO } from '../interfaces/CreatePostDTO';
import { PostsRepository } from '../repositories/interface/PostsRepository';
import { ICreatePostService } from './interfaces/ICreatePostService';

export class CreatePostService implements ICreatePostService {
  #postsRepository: PostsRepository;

  constructor(postsRepository: PostsRepository) {
    this.#postsRepository = postsRepository;
  }

  async execute(post: CreatePostDTO): Promise<void> {
    await this.#postsRepository.create(post);
  }
}
