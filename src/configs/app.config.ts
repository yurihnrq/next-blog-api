import express from 'express';
import postsRouter from '../routes/posts.routes';
import usersRouter from '../routes/users.routes';
import loginRouter from '../routes/login.routes';

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
