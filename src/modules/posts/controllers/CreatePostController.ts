import { AuthInfo } from '@src/modules/auth/services/interfaces/AuthInfo';
import { Request, Response } from 'express';
import { CreatePostService } from '../services/interfaces/CreatePostService';

export class CreatePostController implements APIController {
  #createPostService: CreatePostService;

  constructor(createPostService: CreatePostService) {
    this.#createPostService = createPostService;
  }

  execute = async (req: Request, res: APIResponse): Promise<Response> => {
    const { title, content } = req.body;
    const { userId } = res.locals.authInfo as AuthInfo;

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
