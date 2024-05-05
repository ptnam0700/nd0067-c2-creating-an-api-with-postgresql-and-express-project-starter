import client from "../database";

export type Product = {
  id: number;
  name: string;
  price: number;
  category?: string;  
}

export type ProductInput = Omit<Product, 'id'>;

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
  
      conn.release();
  
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get products. Error: ${error}`);
      
    }
  }

  async show(productId: number): Promise<Product> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
  
      const conn = await client.connect();
  
      const result = await conn.query(sql, [productId]);
  
      conn.release();
  
      return result.rows[0];
      } catch (err) {
          throw new Error(`Could not find product ${productId}. Error: ${err}`);
      }
  }

  async create(p: ProductInput): Promise<Product> {
    try {
      const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
  
      const conn = await client.connect();
  
      const result = await conn.query(sql, [p.name, p.price, p.category]);
  
      conn.release();
  
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not create product. Error: ${error}`);
    }
  }

  // async topFive(): Promise<Product[]> {
  //   try {
  //     const conn = await client.connect();
  //     const sql = 'SELECT * FROM products ORDER BY price DESC LIMIT 5';
  //     const result = await conn.query(sql);
  
  //     conn.release();
  
  //     return result.rows;
  //   } catch (error) {
  //     throw new Error(`Could not get products. Error: ${error}`);
      
  //   }
  // }

  // async byCategory(category: string): Promise<Product[]> {
  //   try {
  //     const conn = await client.connect();
  //     const sql = 'SELECT * FROM products WHERE category=($1)';
  //     const result = await conn.query(sql, [category]);
  
  //     conn.release();
  
  //     return result.rows;
  //   } catch (error) {
  //     throw new Error(`Could not get products. Error: ${error}`);
      
  //   }
  // }
}