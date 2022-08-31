import { Request, Response } from 'express';
import { IRemoveUserService } from '../services/interfaces/IRemoveUserService';
import APIError from '@src/errors/APIError';
import { IAuthInfo } from '@src/modules/auth/services/interfaces/IAuthInfo';

export class RemoveUserController implements IController {
  #removeUserService: IRemoveUserService;

  constructor(removeUserService: IRemoveUserService) {
    this.#removeUserService = removeUserService;
  }

  execute = async (req: Request, res: IResponse): Promise<Response> => {
    const { id } = req.params;

    const { userId } = res.locals.authInfo as IAuthInfo;

    if (!userId || userId !== id)
      throw new APIError(401, 'Unauthorized request.');

    await this.#removeUserService.execute(id);

    return res.status(200).json({
      success: true,
      message: 'User deleted successfully.',
      data: null
    });
  };
}
