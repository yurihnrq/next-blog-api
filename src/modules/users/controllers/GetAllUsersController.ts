import { Request, Response } from 'express';
import { IGetAllUsersService } from '../services/interfaces/IGetAllUsersService';
import { IUser } from '../IUser/interfaces/IUser';

export class GetAllUsersController implements IController {
  #getAllUsersService: IGetAllUsersService;

  constructor(getAllUsersService: IGetAllUsersService) {
    this.#getAllUsersService = getAllUsersService;
  }

  execute = async (
    req: Request,
    res: IResponse<IUser[]>
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
