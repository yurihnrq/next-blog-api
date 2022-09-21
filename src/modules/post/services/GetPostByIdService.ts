import APIError from '@src/errors/APIError';
import { IPost } from '../interfaces/IPost';
import { IPostsRepository } from '../repositories/interface/IPostsRepository';
import { IGetPostByIdService } from './interfaces/IGetPostByIdService';

export class GetPostByIdService implements IGetPostByIdService {
  #postsRepository: IPostsRepository;

  constructor(postsRepository: IPostsRepository) {
    this.#postsRepository = postsRepository;
  }

  async execute(id: string): Promise<IPost> {
    const post = await this.#postsRepository.getById(id);

    if (!post) throw new APIError(404, 'Post with provided id does not exist.');

    return post;
  }
}
