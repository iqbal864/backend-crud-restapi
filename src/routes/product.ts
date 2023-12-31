import { Router, type Request, type Response, type NextFunction } from 'express';
import { logger } from '../utils/logger';

export const ProductRouter: Router = Router();

ProductRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('get data product');
  res.status(200).send({
    status: true,
    statusCode: 200,
    data: [
      {
        name: 'Adidas Samba',
        price: 2000000
      }
    ]
  });
});
