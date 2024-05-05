import express, { Request, Response }  from 'express';
import { verifyAuthToken } from "../middlewares/auth";
import { OrderInput, OrderStatus, OrderStore } from '../models/orders';

export const order_routes = (app: express.Application) => {
  app.get("/orders", verifyAuthToken, show);
  app.post("/orders", verifyAuthToken, create);
  app.post("/orders/:id/product", verifyAuthToken, addProduct);
};

const store = new OrderStore();

const show = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const user_id = parseInt(req.user_id);

    const orders = await store.show(user_id);
    res.json(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const user_id = parseInt(req.user_id);
    
    const orderInput: OrderInput = {
      user_id: user_id,
      status: OrderStatus.ACTIVE as OrderStatus
    };

    const order = await store.create(orderInput);
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
}

const addProduct = async (req: Request, res: Response) => {
  try {
    const order_id = parseInt(req.params.id);
    const product_id = req.body.product_id as number;
    const quantity = req.body.quantity as number;

    const orderProductInput = {
      order_id: order_id,
      product_id: product_id,
      quantity: quantity,
    } 

    const orderProduct = await store.addProduct(orderProductInput);
    res.json(orderProduct);
  } catch (error) {
    res.status(500).send(error);
  }
}

