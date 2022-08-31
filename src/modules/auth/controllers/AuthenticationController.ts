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

  execute = async (req: Request, res: IResponse<string>): Promise<Response> => {
    const { email, password } = req.body;

    const authInfo = await this.#clientAuthService.execute(email, password);

    const token = await this.#generateTokenService.execute(authInfo);

    return res.status(200).json({
      success: true,
      message: 'Authentication successful.',
      data: token
    });
  };
}
