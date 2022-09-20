import { Request, Response } from 'express';
import { IUpdatePostService } from '../services/interfaces/IUpdatePostService';

export class UpdatePostController implements IController {
  #updatePostService: IUpdatePostService;

  constructor(updatePostService: IUpdatePostService) {
    this.#updatePostService = updatePostService;
  }

  async execute(request: Request, response: IResponse): Promise<Response> {
    const { id, title, content } = request.body;

    await this.#updatePostService.execute({
      id,
      title,
      content
    });

    return response.status(200).json({
      success: true,
      message: 'Post updated successfully.',
      data: null
    });
  }
}
