import APIError from '@src/errors/APIError';
import { Request } from 'express';
import { Response } from 'express-serve-static-core';
import { GetPostByIdService } from '../services/interfaces/GetPostByIdService';

export class GetPostByIdController implements APIController {
  #getPostByIdService: GetPostByIdService;

  constructor(getPostByIdService: GetPostByIdService) {
    this.#getPostByIdService = getPostByIdService;
  }

  execute = async (req: Request, res: APIResponse): Promise<Response> => {
    const { id } = req.params;

    if (!id) throw new APIError(400, 'Post id is required.');

    const post = await this.#getPostByIdService.execute(id as string);

    return res.status(200).json({
      success: true,
      message: 'Post fetched successfully.',
      data: post
    });
  };
}
