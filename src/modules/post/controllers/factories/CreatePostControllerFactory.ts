import { CreatePostController } from '@src/modules/post/controllers/CreatePostController';
import { PrismaPostsRepositoryFactory } from '@src/modules/post/repositories/factories/PrismaPostsRepositoryFactory';
import { IPostsRepository } from '@src/modules/post/repositories/interface/IPostsRepository';
import { CreatePostService } from '@src/modules/post/services/CreatePostService';
import { ICreatePostService } from '@src/modules/post/services/interfaces/ICreatePostService';

export const CreatePostControllerFactory = () => {
  const postsRepository: IPostsRepository = PrismaPostsRepositoryFactory();

  const createPostService: ICreatePostService = new CreatePostService(
    postsRepository
  );

  return new CreatePostController(createPostService);
};
