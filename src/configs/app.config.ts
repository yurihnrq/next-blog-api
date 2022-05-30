import express from 'express';
import postsRouter from '../modules/posts/routes';
import usersRouter from '../modules/user/routes';
import loginRouter from '../modules/login/routes';

const app = express();

app.use(express.json());

app.use(postsRouter);
app.use(usersRouter);
app.use(loginRouter);

app.use((_req, res) => {
  res.status(400).json({
    message: 'Invalid request, please check url and method.'
  });
});

export default app;
