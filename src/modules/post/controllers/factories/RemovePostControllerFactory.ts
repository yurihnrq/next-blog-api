import { PrismaPostsRepositoryFactory } from '../../repositories/factories/PrismaPostsRepositoryFactory';
import { IPostsRepository } from '../../repositories/interface/IPostsRepository';
import { IRemovePostService } from '../../services/interfaces/IRemovePostService';
import { RemovePostService } from '../../services/RemovePostService';
import { RemovePostController } from '../RemovePostController';

export const RemovePostControllerFactory = () => {
  const postsRepository: IPostsRepository = PrismaPostsRepositoryFactory();

  const removePostService: IRemovePostService = new RemovePostService(
    postsRepository
  );

  return new RemovePostController(removePostService);
};
