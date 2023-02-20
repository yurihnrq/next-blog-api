import APIError from '@src/errors/APIError';
import { Post } from '../interfaces/Post';
import { PostsRepository } from '../repositories/interfaces/PostsRepository';
import { GetPostByIdService } from './interfaces/GetPostByIdService';

export class GetPostById implements GetPostByIdService {
  #postsRepository: PostsRepository;

  constructor(postsRepository: PostsRepository) {
    this.#postsRepository = postsRepository;
  }

  async execute(id: string): Promise<Post> {
    const post = await this.#postsRepository.getById(id);

    if (!post) throw new APIError(404, 'Post with provided id does not exist.');

    return post;
  }
}
