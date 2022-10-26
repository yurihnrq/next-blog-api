import { Request, Response } from 'express';
import { IRemoveUserService } from '../services/interfaces/IRemoveUserService';
import APIError from '@src/errors/APIError';
import { AuthInfo } from '@src/modules/auth/services/interfaces/AuthInfo';

export class RemoveUserController implements APIController {
  #removeUserService: IRemoveUserService;

  constructor(removeUserService: IRemoveUserService) {
    this.#removeUserService = removeUserService;
  }

  execute = async (req: Request, res: APIResponse): Promise<Response> => {
    const { id } = req.params;

    const { userId } = res.locals.authInfo as AuthInfo;

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
