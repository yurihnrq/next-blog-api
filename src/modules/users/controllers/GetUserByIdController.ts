import { Request, Response } from 'express';
import { GetUserByIdService } from '../services/interfaces/GetUserByIdService';
import APIError from '@src/errors/APIError';
import { IUser } from '../interfaces/User';

export class GetUserByIdController implements APIController {
  #getUserByIdService: GetUserByIdService;

  constructor(getUserByIdService: GetUserByIdService) {
    this.#getUserByIdService = getUserByIdService;
  }

  execute = async (
    req: Request,
    res: APIResponse<IUser>
  ): Promise<Response> => {
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
