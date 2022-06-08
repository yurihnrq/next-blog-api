import { Request, Response } from 'express';
import { IGetAllUsersService } from '../services/interfaces/IGetAllUsersService';
import { IController } from './interfaces/IController';

export class GetAllUsersController implements IController {
  #getAllUsersService: IGetAllUsersService;

  constructor(getAllUsersService: IGetAllUsersService) {
    this.#getAllUsersService = getAllUsersService;
  }

  execute = async (req: Request, res: Response): Promise<Response> => {
    const { page } = req.query;

    const pageInt = page ? parseInt(page as string) : 1;

    const users = await this.#getAllUsersService.execute(pageInt);

    return res.status(200).json({
      message: 'Users fetched successfully.',
      data: users
    });
  };
}
