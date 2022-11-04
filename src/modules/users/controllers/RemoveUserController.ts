import { Request, Response } from 'express';
import { RemoveUserService } from '../services/interfaces/RemoveUserService';
import APIError from '@src/errors/APIError';
import { AuthInfo } from '@src/modules/auth/services/interfaces/AuthInfo';

export class RemoveUserController implements APIController {
  #removeUserService: RemoveUserService;

  constructor(removeUserService: RemoveUserService) {
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
