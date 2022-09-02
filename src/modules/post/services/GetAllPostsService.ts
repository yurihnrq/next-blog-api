import { IPost } from '../interfaces/IPost';
import { IPostsRepository } from '../repositories/interface/IPostsRepository';

export class GetAllPostsService {
  #postsRepository: IPostsRepository;

  constructor(postsRepository: IPostsRepository) {
    this.#postsRepository = postsRepository;
  }

  async execute(page: number): Promise<IPost[]> {
    const posts = await this.#postsRepository.getAll(page);

    return posts;
  }
}
