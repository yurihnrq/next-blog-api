import { ValidationMiddleware } from '@src/middlewares/ValidationMiddleware';
import { ClientAuthSchema } from '@src/modules/auth/interfaces/ClientAuthDTO';
import { Router } from 'express';
import { AuthenticationControllerFactory } from '../modules/auth/controllers/factories/AuthenticationControllerFactory';

/**
 * Setup the router for the authentication routes.
 *
 * @returns {Router} The router for the authentication routes.
 *
 * @example
 * import { AuthRouter } from '@src/routers/AuthRouter';
 *
 * app.use(AuthRouter());
 */
export const AuthRouter = (): Router => {
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
