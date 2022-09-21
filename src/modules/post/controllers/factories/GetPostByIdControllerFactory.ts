import prisma from '@src/configs/prisma';
import { IPostsRepository } from '../../repositories/interface/IPostsRepository';
import { PrismaPostsRepository } from '../../repositories/PrismaPostsRepository';
import { GetPostByIdService } from '../../services/GetPostByIdService';
import { IGetPostByIdService } from '../../services/interfaces/IGetPostByIdService';
import { GetPostByIdController } from '../GetPostByIdController';

export const GetPostByIdControllerFactory = () => {
  const postsRepository: IPostsRepository = new PrismaPostsRepository(prisma);

  const getPostByIdService: IGetPostByIdService = new GetPostByIdService(
    postsRepository
  );

  return new GetPostByIdController(getPostByIdService);
};
