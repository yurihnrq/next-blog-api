import { PrismaPostsRepositoryFactory } from '@src/modules/post/repositories/factories/PrismaPostsRepositoryFactory';
import { PostsRepository } from '@src/modules/post/repositories/interface/PostsRepository';
import { GetAllPostsService } from '../../services/GetAllPostsService';
import { IGetAllPostsService } from '../../services/interfaces/IGetAllPostsService';
import { GetAllPostsController } from '../GetAllPostsController';

export const GetAllPostsControllerFactory = () => {
  const postsRepository: PostsRepository = PrismaPostsRepositoryFactory();

  const getAllPostsService: IGetAllPostsService = new GetAllPostsService(
    postsRepository
  );

  return new GetAllPostsController(getAllPostsService);
};
