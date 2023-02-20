import { PrismaPostsRepositoryFactory } from '../../repositories/factories/PrismaPostsRepositoryFactory';
import { PostsRepository } from '../../repositories/interfaces/PostsRepository';
import { UpdatePost } from '../../services/UpdatePost';
import { UpdatePostService } from '../../services/interfaces/UpdatePostService';
import { UpdatePostController } from '../UpdatePostController';

export const UpdatePostControllerFactory = () => {
  const postsRepository: PostsRepository = PrismaPostsRepositoryFactory();

  const updatePostService: UpdatePostService = new UpdatePost(postsRepository);

  return new UpdatePostController(updatePostService);
};
