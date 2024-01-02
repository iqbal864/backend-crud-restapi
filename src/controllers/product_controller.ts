import { type Request, type Response, type NextFunction } from 'express';
import { createProductValidation } from '../validations/product_validation';
import { logger } from '../utils/logger';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await prisma.products.findMany();

    const id = req.params.id;

    if (id) {
      const product = await prisma.products.findFirst({
        where: {
          id: Number(id)
        }
      });

      if (product == null) {
        logger.info('Data product not found');
        return res.status(404).send({
          status: false,
          statusCode: 404,
          data: {}
        });
      }

      logger.info('Get data product');
      return res.status(200).send({
        status: true,
        statusCode: 200,
        data: product
      });
    }

    logger.info('Get data product');
    return res.status(200).send({
      status: true,
      statusCode: 200,
      data: products
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error('ERR: (Get Product) = ', error.message);
      return res.status(500).send({
        status: false,
        statusCode: 500,
        message: error.message
      });
    }
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
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

  try {
    const product = await prisma.products.create({
      data: {
        name: value.name,
        price: value.price,
        stok: value.stok
      }
    });

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
      return res.status(500).send({
        status: false,
        statusCode: 500,
        message: error.message
      });
    }
  }
};
