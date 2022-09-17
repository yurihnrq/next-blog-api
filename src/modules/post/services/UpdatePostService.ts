import APIError from '@src/errors/APIError';
import { IPost } from '../interfaces/IPost';
import { IPostsRepository } from '../repositories/interface/IPostsRepository';
import { IUpdatePostService } from './interfaces/IUpdatePostService';

export class UpdatePostService implements IUpdatePostService {
  #postsRepository: IPostsRepository;

  constructor(postsRepository: IPostsRepository) {
    this.#postsRepository = postsRepository;
  }

  async execute(data: IPost): Promise<void> {
    const existentPost = await this.#postsRepository.getById(data.id as string);

    if (!existentPost)
      throw new APIError(404, 'Post with provided id does not exist.');

    await this.#postsRepository.update(data);
  }
}
