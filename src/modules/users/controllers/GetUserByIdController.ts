import { Request, Response } from 'express';
import { IGetUserByIdService } from '../services/interfaces/IGetUserByIdService';
import { IController } from './interfaces/IController';

export class GetUserByIdController implements IController {
  #getUserByIdService: IGetUserByIdService;

  constructor(getUserByIdService: IGetUserByIdService) {
    this.#getUserByIdService = getUserByIdService;
  }

  execute = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: 'User id is required.' });

    const user = await this.#getUserByIdService.execute(id);

    return res.status(200).json(user);
  };
}
