import express from 'express';
// express-async-errors must be imported to ensure that errors thrown
// in async functions are handled by the error handler.
// This packaged remove the need of using try/catch with next() in
// async functions.
import 'express-async-errors';
import { usersRouter } from '../../modules/users/routes';
import { loginRouter } from '../../modules/login/routes';
import validateErrors from '../../middlewares/error/handler';

const app = express();

app.use(express.json());

app.use(usersRouter.router());
app.use(loginRouter.router());

app.use(validateErrors);

export default app;
