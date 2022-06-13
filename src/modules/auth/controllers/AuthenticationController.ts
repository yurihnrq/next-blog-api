import { IController } from '@src/types/IController';
import { Request, Response } from 'express';
import { IClientAuthService } from '../services/interfaces/IClientAuthService';

export class AuthenticationController implements IController {
  #clientAuthService: IClientAuthService;

  constructor(clientAuthService: IClientAuthService) {
    this.#clientAuthService = clientAuthService;
  }

  execute = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    await this.#clientAuthService.execute(email, password);

    return res.status(200).json({
      message: 'Authentication successful.',
      data: 'token'
    });
  };
}
