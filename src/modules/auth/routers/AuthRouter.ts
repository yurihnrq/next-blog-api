import { Router } from 'express';
import { AuthenticationControllerFactory } from '../controllers/factories/AuthenticationControllerFactory';

export const AuthRouter = () => {
  const router = Router();

  router.post('/auth', AuthenticationControllerFactory().execute);

  return router;
};
