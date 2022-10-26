import { Request, Response } from 'express';
import { GetAllPostsService } from '../services/interfaces/GetAllPostsService';

export class GetAllPostsController implements APIController {
  #getAllPostsService: GetAllPostsService;

  constructor(getAllPostsService: GetAllPostsService) {
    this.#getAllPostsService = getAllPostsService;
  }

  execute = async (req: Request, res: APIResponse): Promise<Response> => {
    const { page } = req.query;

    const pageInt = page ? parseInt(page as string) : 1;

    const posts = await this.#getAllPostsService.execute(pageInt);

    return res.status(200).json({
      success: true,
      message: 'Posts fetched successfully.',
      data: posts
    });
  };
}
