import { Router } from 'express';
import { createProduct, getProducts, getProductById } from '../controllers/product.controller';

export const ProductRouter: Router = Router();

ProductRouter.get('/', getProducts);
ProductRouter.get('/:id', getProductById);
ProductRouter.post('/', createProduct);
