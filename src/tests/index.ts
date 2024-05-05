import { OrderInput, OrderProductInput, OrderStatus } from "../models/orders";
import { Product, ProductInput } from "../models/products";
import { UserInput } from "../models/users";

export const testUser: UserInput = {
  firstname: 'John',
  lastname: 'Doe',
  password: '123456',
}

export const testOrder: OrderInput = {
  user_id: 1,
  status: OrderStatus.ACTIVE,
}

export const testOrder2: OrderInput = {
  user_id: 2,
  status: OrderStatus.ACTIVE,
}

export const testProduct: ProductInput = {
  name: 'Computer',
  price: 50,
  category: 'Technology',
}

export const testOrderProduct: OrderProductInput = {
  order_id: 1,
  product_id: 1,
  quantity: 5,
};

export let token: string = "";

export function setToken(value: string) {
  token = value;
}