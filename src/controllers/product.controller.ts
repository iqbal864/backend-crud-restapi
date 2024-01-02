import { type Request, type Response, type NextFunction } from 'express';
import { createProductValidation } from '../validations/product_validation';
import { logger } from '../utils/logger';
import { getProductsService, getProductByIdService, createProductService } from '../services/product.service';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await getProductsService();
    logger.info('Get data product');
    return res.status(200).send({
      status: true,
      statusCode: 200,
      data: products
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error('ERR: (Get Product) = ', error.message);
      return res.status(400).send({
        status: false,
        statusCode: 400,
        message: error.message
      });
    }
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const product = await getProductByIdService(Number(id));
    logger.info('Get data product');
    return res.status(200).send({
      status: true,
      statusCode: 200,
      data: product
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error('ERR: (Get Product By Id) = ', error.message);
      return res.status(400).send({
        status: false,
        statusCode: 400,
        message: error.message
      });
    }
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
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

  try {
    const product = await createProductService(value);

    logger.info('Success add data product');
    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: 'Success add data product',
      data: product
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error('ERR: (Create Product) = ', error.message);
      return res.status(400).send({
        status: false,
        statusCode: 400,
        message: error.message
      });
    }
  }
};
