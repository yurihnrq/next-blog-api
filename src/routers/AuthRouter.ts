import { ValidationMiddleware } from '@src/middlewares/ValidationMiddleware';
import { ClientAuthSchema } from '@src/modules/auth/interfaces/ClientAuthDTO';
import { Router } from 'express';
import { AuthenticationControllerFactory } from '../modules/auth/controllers/factories/AuthenticationControllerFactory';

export const AuthRouter = () => {
  const router = Router();

  const clientAuthValidator: APIMiddleware = new ValidationMiddleware(
    ClientAuthSchema
  );

  router.post(
    '/auth',
    clientAuthValidator.execute,
    AuthenticationControllerFactory().execute
  );

  return router;
};
