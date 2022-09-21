import { IAuthInfo } from '@src/modules/auth/services/interfaces/IAuthInfo';
import { Request, Response } from 'express';
import { ICreatePostService } from '../services/interfaces/ICreatePostService';

export class CreatePostController implements IController {
  #createPostService: ICreatePostService;

  constructor(createPostService: ICreatePostService) {
    this.#createPostService = createPostService;
  }

  execute = async (req: Request, res: IResponse): Promise<Response> => {
    const { title, content } = req.body;
    const { userId } = res.locals.authInfo as IAuthInfo;

    await this.#createPostService.execute({
      authorId: userId,
      title,
      content
    });

    return res.status(201).json({
      success: true,
      message: 'Post created successfully.',
      data: null
    });
  };
}
