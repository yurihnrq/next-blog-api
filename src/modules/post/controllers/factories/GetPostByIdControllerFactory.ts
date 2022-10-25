import { PrismaPostsRepositoryFactory } from '../../repositories/factories/PrismaPostsRepositoryFactory';
import { PostsRepository } from '../../repositories/interface/PostsRepository';
import { GetPostByIdService } from '../../services/GetPostByIdService';
import { IGetPostByIdService } from '../../services/interfaces/IGetPostByIdService';
import { GetPostByIdController } from '../GetPostByIdController';

export const GetPostByIdControllerFactory = () => {
  const postsRepository: PostsRepository = PrismaPostsRepositoryFactory();

  const getPostByIdService: IGetPostByIdService = new GetPostByIdService(
    postsRepository
  );

  return new GetPostByIdController(getPostByIdService);
};
