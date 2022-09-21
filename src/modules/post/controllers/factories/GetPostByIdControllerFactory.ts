import { PrismaPostsRepositoryFactory } from '../../repositories/factories/PrismaPostsRepositoryFactory';
import { IPostsRepository } from '../../repositories/interface/IPostsRepository';
import { GetPostByIdService } from '../../services/GetPostByIdService';
import { IGetPostByIdService } from '../../services/interfaces/IGetPostByIdService';
import { GetPostByIdController } from '../GetPostByIdController';

export const GetPostByIdControllerFactory = () => {
  const postsRepository: IPostsRepository = PrismaPostsRepositoryFactory();

  const getPostByIdService: IGetPostByIdService = new GetPostByIdService(
    postsRepository
  );

  return new GetPostByIdController(getPostByIdService);
};
