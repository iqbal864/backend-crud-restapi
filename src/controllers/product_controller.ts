import { type Request, type Response, type NextFunction } from 'express';
import { createProductValidation } from '../validations/product_validation';
import { logger } from '../utils/logger';

export const getProduct = (req: Request, res: Response, next: NextFunction) => {
  const products = [
    {
      id: 1,
      name: 'Adidas Samba',
      price: 2000000
    },
    {
      id: 2,
      name: 'Adidas Jeans',
      price: 1500000
    }
  ];

  const id = req.params.id;

  if (id) {
    const filterProducts = products.filter((product) => {
      if (product.id === Number(id)) {
        return product;
      }
    });

    if (filterProducts.length === 0) {
      logger.info('data not found');
      return res.status(404).send({
        status: false,
        statusCode: 404,
        data: {}
      });
    }

    logger.info('get data product');
    return res.status(200).send({
      status: true,
      statusCode: 200,
      data: filterProducts[0]
    });
  }

  logger.info('get data product');
  return res.status(200).send({
    status: true,
    statusCode: 200,
    data: products
  });
};

export const createProduct = (req: Request, res: Response, next: NextFunction) => {
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
  return res.status(200).send({
    status: true,
    statusCode: 200,
    message: 'Success add data product',
    data: value
  });
};
