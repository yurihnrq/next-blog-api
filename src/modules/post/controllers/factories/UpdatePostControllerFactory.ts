import { PrismaPostsRepositoryFactory } from '../../repositories/factories/PrismaPostsRepositoryFactory';
import { IPostsRepository } from '../../repositories/interface/IPostsRepository';
import { IUpdatePostService } from '../../services/interfaces/IUpdatePostService';
import { UpdatePostService } from '../../services/UpdatePostService';
import { UpdatePostController } from '../UpdatePostController';

export const UpdatePostControllerFactory = () => {
  const postsRepository: IPostsRepository = PrismaPostsRepositoryFactory();

  const updatePostService: IUpdatePostService = new UpdatePostService(
    postsRepository
  );

  return new UpdatePostController(updatePostService);
};
