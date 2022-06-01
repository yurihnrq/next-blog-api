import { Router } from 'express';
import { ILoginControllers } from '../interfaces';

export class LoginRouter implements IRouter {
  #router;

  constructor(loginControllers: ILoginControllers) {
    this.#router = Router();

    this.#router.post('/login', loginControllers.login);
  }

  router = () => {
    return this.#router;
  };
}
