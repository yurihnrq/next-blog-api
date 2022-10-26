import APIError from '@src/errors/APIError';
import { IAuthInfo } from '@src/modules/auth/services/interfaces/IAuthInfo';
import { Request, Response } from 'express';
import { UpdatePostService } from '../services/interfaces/UpdatePostService';

export class UpdatePostController implements APIController {
  #updatePostService: UpdatePostService;

  constructor(updatePostService: UpdatePostService) {
    this.#updatePostService = updatePostService;
  }

  execute = async (req: Request, res: APIResponse): Promise<Response> => {
    const { title, content } = req.body;
    const { id } = req.params;
    const { userId } = res.locals.authInfo as IAuthInfo;

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
  };
}
