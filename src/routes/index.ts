import { type Application, type Router } from 'express';
import { ProductRouter } from './product';

const arrRoutes: Array<[string, Router]> = [['/products', ProductRouter]];

export const routes = (app: Application) => {
  arrRoutes.forEach((route) => {
    const [url, router] = route;
    app.use(url, router);
  });
};
