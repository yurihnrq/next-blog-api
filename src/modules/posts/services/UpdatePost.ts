import APIError from '@src/errors/APIError';
import { UpdatePostDTO } from '../interfaces/UpdatePostDTO';
import { PostsRepository } from '../repositories/interface/PostsRepository';
import { UpdatePostService } from './interfaces/UpdatePostService';

export class UpdatePost implements UpdatePostService {
  #postsRepository: PostsRepository;

  constructor(postsRepository: PostsRepository) {
    this.#postsRepository = postsRepository;
  }

  async execute(data: UpdatePostDTO): Promise<void> {
    const existentPost = await this.#postsRepository.getById(data.id);

    if (!existentPost)
      throw new APIError(404, 'Post with provided id does not exist.');

    if (existentPost.authorId !== data.updateAuthorId)
      throw new APIError(403, 'You are not allowed to update this post.');

    await this.#postsRepository.update(data);
  }
}
