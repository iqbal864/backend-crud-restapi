import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProductsRepository = async () => {
  const products = await prisma.products.findMany();

  return products;
};

export const getProductByIdRepository = async (productId: number) => {
  const product = await prisma.products.findFirst({
    where: {
      id: productId
    }
  });

  return product;
};

export const getProductByNameRepository = async (productName: string) => {
  const product = await prisma.products.findFirst({
    where: {
      name: productName
    }
  });

  return product;
};

export const getProductByNameNotIdRepository = async (productId: number, productName: string) => {
  const product = await prisma.products.findFirst({
    where: {
      name: productName,
      id: { not: productId }
    }
  });

  return product;
};

export const createProductRepository = async (name: string, price: number, stok: number) => {
  const product = await prisma.products.create({
    data: {
      name,
      price,
      stok
    }
  });

  return product;
};

export const updateProductRepository = async (id: number, name: string, price: number, stok: number) => {
  const product = await prisma.products.update({
    where: {
      id
    },
    data: {
      name,
      price,
      stok
    }
  });

  return product;
};

export const deleteProductRepository = async (productId: number) => {
  const product = await prisma.products.delete({
    where: {
      id: productId
    }
  });

  return product;
};
