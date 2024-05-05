import app from '../server';
import supertest from 'supertest';
import { OrderStore } from '../models/orders';
import { ProductStore } from '../models/products';
import { UserStore } from '../models/users';
import { setToken, testOrder, testOrder2, testOrderProduct, testProduct, testUser, token } from './index';

const orderStore = new OrderStore();
const productStore = new ProductStore();
const userStore = new UserStore();
const request = supertest(app);

describe('Order Model', () => {
  beforeAll(async () => {
    await userStore.create(testUser);
    await productStore.create(testProduct);
    const res = await request.post('/users/login').send(testUser);
    setToken(res.body);
  });

  describe('Methods Availability', () => {
    it('should have a show method', () => {
      expect(orderStore.show).toBeDefined();
    });
  
    it('should have a create method', () => {
      expect(orderStore.create).toBeDefined();
    });
  
    it('should have an addProduct method', () => {
      expect(orderStore.addProduct).toBeDefined();
    });
  });

  describe('Methods Functionality', () => {
    it('should return a list of orders', async () => {
      const orders = await orderStore.show(1);
      expect(orders).toBeTruthy();
    });

    it('should create an order', async () => {
      const order = await orderStore.create(testOrder);
      expect(`${order.user_id}`).toMatch(`${testOrder.user_id}`);
    });

    it('should create a product to an order', async () => {
      const orderProduct = await orderStore.addProduct(testOrderProduct);
      expect(`${orderProduct.order_id}`).toMatch(`${testOrderProduct.order_id}`);
    });
  });

  describe('End Points', () => {
    it('create should return a order', async () => {
      const res = await request.post('/orders').send(testOrder).set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it('show should return orders', async () => {
      const res = await request.get('/orders').set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it('addProduct should return a orderProduct', async () => {
      const res = await request.post('/orders/1/product').send(testOrderProduct).set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });
  });

});