import { Request, Response } from 'express';
import { IGetAllPostsService } from '../services/interfaces/IGetAllPostsService';

export class GetAllPostsController implements IController {
  #getAllPostsService: IGetAllPostsService;

  constructor(getAllPostsService: IGetAllPostsService) {
    this.#getAllPostsService = getAllPostsService;
  }

  execute = async (req: Request, res: IResponse): Promise<Response> => {
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