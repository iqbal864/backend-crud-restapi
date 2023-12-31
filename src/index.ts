import bodyParser from 'body-parser';
import express, { type Application } from 'express';
import { routes } from './routes';
import { logger } from './utils/logger';
import cors from 'cors';

const app: Application = express();
const port: Number = 7000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

routes(app);

app.listen(port, () => {
  logger.info(`server berjalan pada port ${port}`);
});
