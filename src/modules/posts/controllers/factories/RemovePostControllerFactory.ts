import { PrismaPostsRepositoryFactory } from '../../repositories/factories/PrismaPostsRepositoryFactory';
import { PostsRepository } from '../../repositories/interface/PostsRepository';
import { RemovePost } from '../../services/RemovePost';
import { RemovePostService } from '../../services/interfaces/RemovePostService';
import { RemovePostController } from '../RemovePostController';

export const RemovePostControllerFactory = () => {
  const postsRepository: PostsRepository = PrismaPostsRepositoryFactory();

  const removePostService: RemovePostService = new RemovePost(postsRepository);

  return new RemovePostController(removePostService);
};
