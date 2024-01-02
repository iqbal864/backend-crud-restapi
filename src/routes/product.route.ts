import { Router } from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller';

export const ProductRouter: Router = Router();

ProductRouter.get('/', getProducts);
ProductRouter.get('/:id', getProductById);
ProductRouter.post('/', createProduct);
ProductRouter.put('/:id', updateProduct);
ProductRouter.delete('/:id', deleteProduct);
