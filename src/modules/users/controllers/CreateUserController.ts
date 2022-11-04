import { Request, Response } from 'express';
import { CreateUserService } from '../services/interfaces/CreateUserService';

export class CreateUserController implements APIController {
  #createUserService: CreateUserService;

  constructor(createUserService: CreateUserService) {
    this.#createUserService = createUserService;
  }

  execute = async (req: Request, res: APIResponse): Promise<Response> => {
    const { name, email, password, birthDate, biography } = req.body;

    await this.#createUserService.execute({
      name,
      email,
      password,
      birthDate,
      biography
    });

    return res.status(201).json({
      success: true,
      message: 'User created successfully.',
      data: null
    });
  };
}
