import { PrismaPostsRepositoryFactory } from '@src/modules/post/repositories/factories/PrismaPostsRepositoryFactory';
import { PostsRepository } from '@src/modules/post/repositories/interface/PostsRepository';
import { CreatePostService } from '../../services/CreatePostService';
import { ICreatePostService } from '../../services/interfaces/ICreatePostService';
import { CreatePostController } from '../CreatePostController';

export const CreatePostControllerFactory = () => {
  const postsRepository: PostsRepository = PrismaPostsRepositoryFactory();

  const createPostService: ICreatePostService = new CreatePostService(
    postsRepository
  );

  return new CreatePostController(createPostService);
};
