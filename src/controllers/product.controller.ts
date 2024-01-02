import { type Request, type Response, type NextFunction } from 'express';
import { productValidation } from '../validations/product_validation';
import { logger } from '../utils/logger';
import {
  getProductsService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService
} from '../services/product.service';

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
  const { error, value } = productValidation(req.body);
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

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  const productId = req.params.id;
  const { error, value } = productValidation(req.body);
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
    const product = await updateProductService(Number(productId), value);

    logger.info('Success update data product');
    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: 'Success update data product',
      data: product
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error('ERR: (Update Product) = ', error.message);
      return res.status(400).send({
        status: false,
        statusCode: 400,
        message: error.message
      });
    }
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  const productId = req.params.id;

  try {
    await deleteProductService(Number(productId));

    logger.info('Success delete data product');
    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: 'Success delete data product'
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error('ERR: (Delete Product) = ', error.message);
      return res.status(400).send({
        status: false,
        statusCode: 400,
        message: error.message
      });
    }
  }
};
