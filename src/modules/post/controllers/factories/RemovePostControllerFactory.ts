import { PrismaPostsRepositoryFactory } from '../../repositories/factories/PrismaPostsRepositoryFactory';
import { PostsRepository } from '../../repositories/interface/PostsRepository';
import { IRemovePostService } from '../../services/interfaces/IRemovePostService';
import { RemovePostService } from '../../services/RemovePostService';
import { RemovePostController } from '../RemovePostController';

export const RemovePostControllerFactory = () => {
  const postsRepository: PostsRepository = PrismaPostsRepositoryFactory();

  const removePostService: IRemovePostService = new RemovePostService(
    postsRepository
  );

  return new RemovePostController(removePostService);
};
