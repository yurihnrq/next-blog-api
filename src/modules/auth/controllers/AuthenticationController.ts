import { IController } from '@src/types/IController';
import { Request, Response } from 'express';
import { IClientAuthService } from '../services/interfaces/IClientAuthService';
import { IGenerateTokenService } from '../services/interfaces/IGenerateTokenService';

export class AuthenticationController implements IController {
  #clientAuthService: IClientAuthService;
  #generateTokenService: IGenerateTokenService;

  constructor(
    clientAuthService: IClientAuthService,
    generateTokenService: IGenerateTokenService
  ) {
    this.#clientAuthService = clientAuthService;
    this.#generateTokenService = generateTokenService;
  }

  execute = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    const authInfo = await this.#clientAuthService.execute(email, password);

    await this.#generateTokenService.execute(authInfo);

    return res.status(200).json({
      message: 'Authentication successful.',
      data: 'token'
    });
  };
}
