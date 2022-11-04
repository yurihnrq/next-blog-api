import { PrismaPostsRepositoryFactory } from '@src/modules/posts/repositories/factories/PrismaPostsRepositoryFactory';
import { PostsRepository } from '@src/modules/posts/repositories/interface/PostsRepository';
import { CreatePost } from '../../services/CreatePost';
import { CreatePostService } from '../../services/interfaces/CreatePostService';
import { CreatePostController } from '../CreatePostController';

export const CreatePostControllerFactory = () => {
  const postsRepository: PostsRepository = PrismaPostsRepositoryFactory();

  const createPostService: CreatePostService = new CreatePost(postsRepository);

  return new CreatePostController(createPostService);
};
