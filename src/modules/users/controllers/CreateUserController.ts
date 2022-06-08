import { Request, Response } from 'express';
import { ICreateUserService } from '../services/interfaces/ICreateUserService';
import { IController } from './interfaces/IController';

export class CreateUserController implements IController {
  #createUserService: ICreateUserService;

  constructor(createUserService: ICreateUserService) {
    this.#createUserService = createUserService;
  }

  execute = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, password, birthDate, biography } = req.body;

    await this.#createUserService.execute({
      name,
      email,
      password,
      birthDate,
      biography
    });

    return res.status(201).json({
      message: 'User created successfully.'
    });
  };
}
