import APIError from '@src/errors/APIError';
import { Request } from 'express';
import { Response } from 'express-serve-static-core';
import { IGetPostByIdService } from '../services/interfaces/IGetPostByIdService';

export class GetPostByIdController implements IController {
  #getPostByIdService: IGetPostByIdService;

  constructor(getPostByIdService: IGetPostByIdService) {
    this.#getPostByIdService = getPostByIdService;
  }

  execute = async (req: Request, res: IResponse): Promise<Response> => {
    const { id } = req.query;

    if (!id) throw new APIError(400, 'Post id is required.');

    const post = await this.#getPostByIdService.execute(id as string);

    return res.status(200).json({
      success: true,
      message: 'Post fetched successfully.',
      data: post
    });
  };
}
