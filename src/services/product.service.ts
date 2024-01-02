/* eslint-disable @typescript-eslint/member-delimiter-style */
import {
  createProductRepository,
  deleteProductRepository,
  getProductByIdRepository,
  getProductByNameNotIdRepository,
  getProductByNameRepository,
  getProductsRepository,
  updateProductRepository
} from '../repository/product.repository';

export const getProductsService = async () => {
  const products = await getProductsRepository();

  if (!products) {
    throw new Error('Failed create data product');
  }

  return products;
};

export const getProductByIdService = async (productId: number) => {
  const product = await getProductByIdRepository(productId);

  if (!product) {
    throw new Error('Data product not found');
  }

  return product;
};

export const createProductService = async (productData: { name: string; price: number; stok: number }) => {
  const getProductByName = await getProductByNameRepository(productData.name);

  if (getProductByName) {
    throw new Error('Product name already exists');
  }

  const product = await createProductRepository(productData.name, productData.price, productData.stok);

  if (!product) {
    throw new Error('Failed create data product');
  }

  return product;
};

export const updateProductService = async (
  productId: number,
  productData: { name: string; price: number; stok: number }
) => {
  await getProductByIdService(productId);

  const findProductByName = await getProductByNameNotIdRepository(productId, productData.name);
  if (findProductByName) {
    throw new Error('Product name already exists');
  }

  const product = await updateProductRepository(productId, productData.name, productData.price, productData.stok);

  if (!product) {
    throw new Error('Failed update data product');
  }

  return product;
};

export const deleteProductService = async (productId: number) => {
  await getProductByIdService(productId);

  const product = await deleteProductRepository(productId);

  if (!product) {
    throw new Error('Failed delete data product');
  }
};
