import APIError from '@src/errors/APIError';
import { IAuthInfo } from '@src/modules/auth/services/interfaces/IAuthInfo';
import { Request, Response } from 'express';
import { IUpdatePostService } from '../services/interfaces/IUpdatePostService';

export class UpdatePostController implements IController {
  #updatePostService: IUpdatePostService;

  constructor(updatePostService: IUpdatePostService) {
    this.#updatePostService = updatePostService;
  }

  async execute(req: Request, res: IResponse): Promise<Response> {
    const { title, content } = req.body;
    const { id } = req.query;
    const { userId } = res.locals as IAuthInfo;

    if (!id) throw new APIError(400, 'Post id is required.');

    await this.#updatePostService.execute({
      id: id as string,
      title,
      content,
      updateAuthorId: userId
    });

    return res.status(200).json({
      success: true,
      message: 'Post updated successfully.',
      data: null
    });
  }
}
