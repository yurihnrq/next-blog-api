import { PrismaPostsRepositoryFactory } from '@src/modules/post/repositories/factories/PrismaPostsRepositoryFactory';
import { IPostsRepository } from '@src/modules/post/repositories/interface/IPostsRepository';
import { GetAllPostsService } from '../../services/GetAllPostsService';
import { IGetAllPostsService } from '../../services/interfaces/IGetAllPostsService';
import { GetAllPostsController } from '../GetAllPostsController';

export const GetAllPostsControllerFactory = () => {
  const postsRepository: IPostsRepository = PrismaPostsRepositoryFactory();

  const getAllPostsService: IGetAllPostsService = new GetAllPostsService(
    postsRepository
  );

  return new GetAllPostsController(getAllPostsService);
};
