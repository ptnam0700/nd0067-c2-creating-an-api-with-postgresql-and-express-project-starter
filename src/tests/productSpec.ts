import app from '../server';
import supertest from 'supertest';
import { ProductStore } from '../models/products';
import { setToken, testOrder, testOrder2, testOrderProduct, testProduct, testUser, token } from './index';

const productStore = new ProductStore();
const request = supertest(app);

describe('Product Model', () => {
  describe('Methods Availability', () => {
    it('should have a index method', () => {
      expect(productStore.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(productStore.show).toBeDefined();
    });
  
    it('should have a create method', () => {
      expect(productStore.create).toBeDefined();
    });
  
  });

  describe('Methods Functionality', () => {
    it('should create a product', async () => {
      const product = await productStore.create(testProduct);
      expect(`${product.name}`).toMatch(`${testProduct.name}`);
    });

    it('should return a list of products', async () => {
      const products = await productStore.index();
      expect(products).toBeTruthy();
    });

    it('should return a product', async () => {
      const product = await productStore.show(1);
      expect(product).toBeTruthy();
    });
  });

  describe('End Points', () => {
    it('create should return a list of products', async () => {
      const res = await request.get('/products');
      expect(res.status).toBe(200);
    });

    it('create should return a product', async () => {
      const res = await request.get('/products/1');
      expect(res.status).toBe(200);
    })

    it('create should return a product', async () => {
      const res = await request.post('/products').send(testProduct);
      expect(res.status).toBe(200);
    });

    it('show should return products', async () => {
      const res = await request.get('/products');
      expect(res.status).toBe(200);
    });
  });

});