import { PrismaPostsRepositoryFactory } from '@src/modules/post/repositories/factories/PrismaPostsRepositoryFactory';
import { IPostsRepository } from '@src/modules/post/repositories/interface/IPostsRepository';
import { CreatePostService } from '../../services/CreatePostService';
import { ICreatePostService } from '../../services/interfaces/ICreatePostService';
import { CreatePostController } from '../CreatePostController';

export const CreatePostControllerFactory = () => {
  const postsRepository: IPostsRepository = PrismaPostsRepositoryFactory();

  const createPostService: ICreatePostService = new CreatePostService(
    postsRepository
  );

  return new CreatePostController(createPostService);
};
