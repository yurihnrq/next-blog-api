import { IController } from '@src/types/IController';
import { Request, Response } from 'express';

export class AuthenticationController implements IController {
  execute = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json({
      message: 'Authentication successful.',
      data: 'token'
    });
  };
}
