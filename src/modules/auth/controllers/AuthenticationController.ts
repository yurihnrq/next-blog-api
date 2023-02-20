import { Request, Response } from 'express';
import { ClientAuthService } from '../services/interfaces/ClientAuthService';
import { GenerateTokenService } from '../services/interfaces/GenerateTokenService';

export class AuthenticationController implements APIController {
  #clientAuthService: ClientAuthService;
  #generateTokenService: GenerateTokenService;

  constructor(
    clientAuthService: ClientAuthService,
    generateTokenService: GenerateTokenService
  ) {
    this.#clientAuthService = clientAuthService;
    this.#generateTokenService = generateTokenService;
  }

  execute = async (
    req: Request,
    res: APIResponse<string>
  ): Promise<Response> => {
    const { email, password } = req.body;

    const authInfo = await this.#clientAuthService.execute({
      email,
      password
    });

    const token = await this.#generateTokenService.execute(authInfo);

    return res.status(200).json({
      success: true,
      message: 'Authentication successful.',
      data: token
    });
  };
}
