import { PrismaPostsRepositoryFactory } from '@src/modules/posts/repositories/factories/PrismaPostsRepositoryFactory';
import { PostsRepository } from '@src/modules/posts/repositories/interfaces/PostsRepository';
import { GetAllPosts } from '../../services/GetAllPosts';
import { GetAllPostsService } from '../../services/interfaces/GetAllPostsService';
import { GetAllPostsController } from '../GetAllPostsController';

export const GetAllPostsControllerFactory = () => {
  const postsRepository: PostsRepository = PrismaPostsRepositoryFactory();

  const getAllPostsService: GetAllPostsService = new GetAllPosts(
    postsRepository
  );

  return new GetAllPostsController(getAllPostsService);
};
