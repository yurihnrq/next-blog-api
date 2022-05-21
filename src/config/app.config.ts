import express from 'express';
import postsRouter from '../routes/posts.routes';

const app = express();

app.use(postsRouter);

export default app;
