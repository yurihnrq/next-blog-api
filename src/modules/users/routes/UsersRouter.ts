import { Router } from 'express';
import { IUsersControllers } from '../interfaces';

export class UsersRouter implements IRouter {
  #router;

  constructor(
    usersControllers: IUsersControllers,
    validateUserInfo: Middleware,
    authJWT: Middleware
  ) {
    this.#router = Router();

    this.#router.get('/users/:id', usersControllers.getUserById);
    this.#router.get('/users/', usersControllers.getAllUsers);
    this.#router.post('/users/', validateUserInfo, usersControllers.createUser);
    this.#router.delete('/users/:id', authJWT, usersControllers.deleteUser);
    this.#router.put(
      '/users/:id',
      authJWT,
      validateUserInfo,
      usersControllers.updateUser
    );
  }

  router = () => {
    return this.#router;
  };
}
