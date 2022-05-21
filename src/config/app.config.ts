import express from 'express';
import postsRouter from '../routes/posts.routes';
import usersRouter from '../routes/users.routes';

const app = express();

app.use(express.json());

app.use(postsRouter);
app.use(usersRouter);

export default app;
