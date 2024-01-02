/* eslint-disable @typescript-eslint/member-delimiter-style */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProductsService = async () => {
  const products = await prisma.products.findMany();

  if (!products) {
    throw new Error('Failed create data product');
  }

  return products;
};

export const getProductByIdService = async (productId: Number) => {
  const product = await prisma.products.findFirst({
    where: {
      id: Number(productId)
    }
  });

  if (!product) {
    throw new Error('Data product not found');
  }

  return product;
};

export const createProductService = async (productData: { name: string; price: number; stok: number }) => {
  const findProductByName = await prisma.products.findFirst({
    where: {
      name: productData.name
    }
  });

  if (findProductByName) {
    throw new Error('Product name already exists');
  }

  const product = await prisma.products.create({
    data: {
      name: productData.name,
      price: productData.price,
      stok: productData.stok
    }
  });

  if (!product) {
    throw new Error('Failed create data product');
  }

  return product;
};
