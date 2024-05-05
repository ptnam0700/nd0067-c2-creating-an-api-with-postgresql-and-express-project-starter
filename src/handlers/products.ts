import express, { Request, Response } from 'express';
import { ProductStore } from '../models/products';


const product_routes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', create);
  // app.get('/products/top5', topFive);
  // app.get('/products/category/:category', byCategory);
}

const store = new ProductStore();

const index = async (_: Request, res: Response) => {
  try {
      const products = await store.index();
      res.json(products);
  } catch (error) {
      res.status(500).send(error);
  }
}

const show = async (req: Request, res: Response) => {
  try {
      const product = await store.show(parseInt(req.params.id));
      res.json(product);
  } catch (error) {
      res.status(500).send(error);
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const product = await store.create(req.body);
    res.json(product);
  } catch (error) {
      res.status(500).send(error);
  }
}

// const topFive = async (_: Request, res: Response) => {
//   try {
//     const products = await store.topFive();
//     res.json(products);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// }

// const byCategory = async (req: Request, res: Response) => {
//   try {
//     const products = await store.byCategory(req.params.category);
//     res.json(products);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// }

export default product_routes;