import { PrismaPostsRepositoryFactory } from '../../repositories/factories/PrismaPostsRepositoryFactory';
import { PostsRepository } from '../../repositories/interface/PostsRepository';
import { IUpdatePostService } from '../../services/interfaces/IUpdatePostService';
import { UpdatePostService } from '../../services/UpdatePostService';
import { UpdatePostController } from '../UpdatePostController';

export const UpdatePostControllerFactory = () => {
  const postsRepository: PostsRepository = PrismaPostsRepositoryFactory();

  const updatePostService: IUpdatePostService = new UpdatePostService(
    postsRepository
  );

  return new UpdatePostController(updatePostService);
};
