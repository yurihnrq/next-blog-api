import { Request, Response } from 'express';
import { IRemovePostService } from '../services/interfaces/IRemovePostService';

export class RemovePostController implements IController {
  #removePostService: IRemovePostService;

  constructor(removePostService: IRemovePostService) {
    this.#removePostService = removePostService;
  }

  execute = async (req: Request, res: IResponse): Promise<Response> => {
    const { id } = req.query;

    await this.#removePostService.execute(id as string);

    return res.status(200).json({
      success: true,
      message: 'Post removed successfully.',
      data: null
    });
  };
}
