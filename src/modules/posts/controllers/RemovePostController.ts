import APIError from '@src/errors/APIError';
import { Request, Response } from 'express';
import { RemovePostService } from '../services/interfaces/RemovePostService';

export class RemovePostController implements APIController {
  #removePostService: RemovePostService;

  constructor(removePostService: RemovePostService) {
    this.#removePostService = removePostService;
  }

  execute = async (req: Request, res: APIResponse): Promise<Response> => {
    const { id } = req.params;

    if (!id) throw new APIError(400, 'Post id is required.');

    await this.#removePostService.execute(id as string);

    return res.status(200).json({
      success: true,
      message: 'Post removed successfully.',
      data: null
    });
  };
}
