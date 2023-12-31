import express, { type Application } from 'express';
import { routes } from './routes';

const app: Application = express();
const port: Number = 7000;

routes(app);

app.listen(port, () => {
  console.log(`server berjalan pada port ${port}`);
});
