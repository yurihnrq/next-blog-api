import app from './configs/app.config';

const port = process.env.SERVER_PORT || 3030;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
