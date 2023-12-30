import express, { type Application, type Request, type Response, type NextFunction } from 'express';

const app: Application = express();
const port: number = 7000;

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({
    data: 'hello world'
  });
});

app.listen(port, () => {
  console.log(`server berjalan pada port ${port}`);
});
