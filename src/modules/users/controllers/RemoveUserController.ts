import { Request, Response } from 'express';
import { IRemoveUserService } from '../services/interfaces/IRemoveUserService';
import { IController } from '../../../types/IController';
import APIError from '@src/errors/APIError';
import { IAuthInfo } from '@src/modules/auth/services/interfaces/IAuthInfo';

export class RemoveUserController implements IController {
  #removeUserService: IRemoveUserService;

  constructor(removeUserService: IRemoveUserService) {
    this.#removeUserService = removeUserService;
  }

  execute = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const { userId } = res.locals.authInfo as IAuthInfo;

    console.log('userId', userId);

    if (!userId || userId !== id)
      throw new APIError(401, 'Unauthorized request.');

    await this.#removeUserService.execute(id);

    return res.status(200).json({
      message: 'User deleted successfully'
    });
  };
}
