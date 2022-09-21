import APIError from '@src/errors/APIError';
import { IUpdatePostDTO } from '../interfaces/IUpdatePostDTO';
import { IPostsRepository } from '../repositories/interface/IPostsRepository';
import { IUpdatePostService } from './interfaces/IUpdatePostService';

export class UpdatePostService implements IUpdatePostService {
  #postsRepository: IPostsRepository;

  constructor(postsRepository: IPostsRepository) {
    this.#postsRepository = postsRepository;
  }

  async execute(data: IUpdatePostDTO): Promise<void> {
    const existentPost = await this.#postsRepository.getById(data.id as string);

    if (!existentPost)
      throw new APIError(404, 'Post with provided id does not exist.');

    if (existentPost.authorId !== data.updateAuthorId)
      throw new APIError(403, 'You are not allowed to update this post.');

    await this.#postsRepository.update(data);
  }
}
