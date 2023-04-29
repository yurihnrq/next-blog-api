import { PrismaUsersRepositoryFactory } from '../../repositories/factories/PrismaUsersRepositoryFactory';
import { UsersRepository } from '../../repositories/interfaces/UsersRepository';
import { GetUserPosts } from '../../services/GetUserPosts';
import { GetUserPostsService } from '../../services/interfaces/GetUserPostsService';
import { GetUserPostsController } from '../GetUserPostsController';

export const GetUserPostsControllerFactory = () => {
  const usersRepository: UsersRepository = PrismaUsersRepositoryFactory();

  const getUserPostsService: GetUserPostsService = new GetUserPosts(
    usersRepository
  );

  return new GetUserPostsController(getUserPostsService);
};
