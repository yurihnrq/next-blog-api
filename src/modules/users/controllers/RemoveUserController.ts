import { Request, Response } from 'express';
import { IRemoveUserService } from '../services/interfaces/IRemoveUserService';
import { IController } from './interfaces/IController';

export class RemoveUserController implements IController {
  #removeUserService: IRemoveUserService;

  constructor(removeUserService: IRemoveUserService) {
    this.#removeUserService = removeUserService;
  }

  execute = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    await this.#removeUserService.execute(id);

    return res.status(200).json({
      message: 'User deleted successfully'
    });
  };
}
