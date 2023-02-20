import { PrismaPostsRepositoryFactory } from '../../repositories/factories/PrismaPostsRepositoryFactory';
import { PostsRepository } from '../../repositories/interfaces/PostsRepository';
import { GetPostById } from '../../services/GetPostById';
import { GetPostByIdService } from '../../services/interfaces/GetPostByIdService';
import { GetPostByIdController } from '../GetPostByIdController';

export const GetPostByIdControllerFactory = () => {
  const postsRepository: PostsRepository = PrismaPostsRepositoryFactory();

  const getPostByIdService: GetPostByIdService = new GetPostById(
    postsRepository
  );

  return new GetPostByIdController(getPostByIdService);
};
