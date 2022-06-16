import { Router } from 'express';
import { AuthenticationControllerFactory } from '../modules/auth/controllers/factories/AuthenticationControllerFactory';

export const AuthRouter = () => {
  const router = Router();

  router.post('/auth', AuthenticationControllerFactory().execute);

  return router;
};
