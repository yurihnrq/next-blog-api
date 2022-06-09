import { Request, Response } from 'express';
import { IUpdateUserService } from '../services/interfaces/IUpdateUserService';
import { IController } from '../../../types/IController';
import APIError from '@src/errors/APIError';

export class UpdateUserController implements IController {
  #updateUserService: IUpdateUserService;

  constructor(updateUserService: IUpdateUserService) {
    this.#updateUserService = updateUserService;
  }

  execute = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { userId } = res.locals;

    if (userId !== id) throw new APIError(401, 'Unauthorized request.');

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
      message: 'User updated successfully'
    });
  };
}
