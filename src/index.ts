import app from './config/app.config';
import postsRouter from './routes/posts.routes';

const port = process.env.PORT || 3030;

app.use(postsRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
