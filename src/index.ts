import express, { type Application } from 'express';
import { routes } from './routes';
import { logger } from './utils/logger';

const app: Application = express();
const port: Number = 7000;

routes(app);

app.listen(port, () => {
  logger.info(`server berjalan pada port ${port}`);
});
