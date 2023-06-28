import { Request, Response } from 'express';
import { GetUserByIdService } from '../services/interfaces/GetUserByIdService';
import APIError from '@src/errors/APIError';
import { User } from '../interfaces/User';

/**
 * Controller for the GET '/users/:id' route.
 *
 * @param {GetUserByIdService} getUserByIdService An instance of the GetUserByIdService class.
 */
export class GetUserByIdController implements APIController {
  #getUserByIdService: GetUserByIdService;

  constructor(getUserByIdService: GetUserByIdService) {
    this.#getUserByIdService = getUserByIdService;
  }

  execute = async (req: Request, res: APIResponse<User>): Promise<Response> => {
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
