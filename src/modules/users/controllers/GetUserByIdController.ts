import { Request, Response } from 'express';
import { IGetUserByIdService } from '../services/interfaces/IGetUserByIdService';
import APIError from '@src/errors/APIError';
import { IUser } from '../services/interfaces/IUser';

export class GetUserByIdController implements IController {
  #getUserByIdService: IGetUserByIdService;

  constructor(getUserByIdService: IGetUserByIdService) {
    this.#getUserByIdService = getUserByIdService;
  }

  execute = async (req: Request, res: IResponse<IUser>): Promise<Response> => {
    const { id } = req.params;

    if (!id) throw new APIError(400, 'User id is required.');

    const user = await this.#getUserByIdService.execute(id);

    return res.status(200).json({
      success: true,
      message: 'User fetched successfully.',
      data: user
    });
  };
}
