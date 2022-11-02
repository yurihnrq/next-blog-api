import { Request, Response } from 'express';
import { IUser } from '../interfaces/User';
import { GetAllUsersService } from '../services/interfaces/GetAllUsersService';

export class GetAllUsersController implements APIController {
  #getAllUsersService: GetAllUsersService;

  constructor(getAllUsersService: GetAllUsersService) {
    this.#getAllUsersService = getAllUsersService;
  }

  execute = async (
    req: Request,
    res: APIResponse<IUser[]>
  ): Promise<Response> => {
    const { page } = req.query;

    const pageInt = page ? parseInt(page as string) : 1;

    const users = await this.#getAllUsersService.execute(pageInt);

    return res.status(200).json({
      success: true,
      message: 'Users fetched successfully.',
      data: users
    });
  };
}
