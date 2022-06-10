import express from 'express';
// express-async-errors must be imported to ensure that errors thrown
// in async functions are handled by the error handler.
// This packaged remove the need of using try/catch with next() in
// async functions.
import 'express-async-errors';
import { UsersRouter } from '../modules/users/routers/UsersRouter';

const app = express();

app.use(express.json());

app.use(UsersRouter());

export default app;
