import { Request, Response } from 'express';
import { IUpdateUserService } from '../services/interfaces/IUpdateUserService';
import APIError from '@src/errors/APIError';
import { IAuthInfo } from '@src/modules/auth/services/interfaces/IAuthInfo';

export class UpdateUserController implements IController {
  #updateUserService: IUpdateUserService;

  constructor(updateUserService: IUpdateUserService) {
    this.#updateUserService = updateUserService;
  }

  execute = async (req: Request, res: IResponse<null>): Promise<Response> => {
    const { id } = req.params;
    const { userId } = res.locals.authInfo as IAuthInfo;

    if (!userId || userId !== id)
      throw new APIError(401, 'Unauthorized request.');

    const { name, email, password, birthDate, biography } = req.body;

    await this.#updateUserService.execute({
      id,
      name,
      email,
      password,
      birthDate,
      biography
    });

    return res.status(200).json({
      success: true,
      message: 'User updated successfully.',
      data: null
    });
  };
}
