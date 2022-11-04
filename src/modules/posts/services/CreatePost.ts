import { CreatePostDTO } from '../interfaces/CreatePostDTO';
import { PostsRepository } from '../repositories/interface/PostsRepository';
import { CreatePostService } from './interfaces/CreatePostService';

export class CreatePost implements CreatePostService {
  #postsRepository: PostsRepository;

  constructor(postsRepository: PostsRepository) {
    this.#postsRepository = postsRepository;
  }

  async execute(post: CreatePostDTO): Promise<void> {
    await this.#postsRepository.create(post);
  }
}
