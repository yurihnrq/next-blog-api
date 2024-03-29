import { Request, Response } from 'express';
import { UpdateUserService } from '../services/interfaces/UpdateUserService';
import APIError from '@src/errors/APIError';
import { AuthInfo } from '@src/modules/common/interfaces/AuthInfo';

export class UpdateUserController implements APIController {
  #updateUserService: UpdateUserService;

  constructor(updateUserService: UpdateUserService) {
    this.#updateUserService = updateUserService;
  }

  execute = async (req: Request, res: APIResponse<null>): Promise<Response> => {
    const { id } = req.params;
    const { userId } = res.locals.authInfo as AuthInfo;

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
