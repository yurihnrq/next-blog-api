import { Post } from '@src/modules/common/interfaces/Post';
import { Request } from 'express';
import { GetUserPostsService } from '../services/interfaces/GetUserPostsService';

export class GetUserPostsController implements APIController {
  #getUserPostsService: GetUserPostsService;

  constructor(getUserPostsService: GetUserPostsService) {
    this.#getUserPostsService = getUserPostsService;
  }

  execute = async (req: Request, res: APIResponse<Post[]>) => {
    const { authorId } = req.params;
    const { page } = req.query;

    const pageInt = page ? parseInt(page as string) : 1;

    const userPosts = await this.#getUserPostsService.execute(
      authorId,
      pageInt
    );

    return res.status(200).json({
      message: 'User posts fetched successfully.',
      success: true,
      data: userPosts
    });
  };
}
