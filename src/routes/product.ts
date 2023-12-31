import { Router, type Request, type Response, type NextFunction } from 'express';
import { createProductValidation } from '../validation/product_validation';
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

ProductRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const { error, value } = createProductValidation(req.body);
  if (error != null) {
    logger.error('ERR: (Create Product) = ', error.details[0].message);
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message,
      data: {}
    });
  }

  logger.info('success add data product');
  res.status(200).send({
    status: true,
    statusCode: 200,
    message: 'Success add data product',
    data: value
  });
});
