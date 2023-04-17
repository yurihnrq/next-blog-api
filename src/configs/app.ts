import express from 'express';
// express-async-errors must be imported to ensure that errors thrown
// in async functions are handled by the error handler.
// This packaged remove the need of using try/catch with next() in
// async functions.
import 'express-async-errors';
import { UsersRouter } from '../routers/UsersRouter';
import { AuthRouter } from '../routers/AuthRouter';
import { PostsRouter } from '@src/routers/PostsRouter';
import { ExceptionMiddleware } from '@src/middlewares/ExceptionMiddleware';
import { swagger } from './swagger';
const exceptionMiddleware = new ExceptionMiddleware();

const app = express();

app.use(express.json());

app.use(AuthRouter());
app.use(UsersRouter());
app.use(PostsRouter());

app.use('/docs', swagger.serve, swagger.setup);

app.use(exceptionMiddleware.execute);

export default app;
