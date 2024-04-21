import client from "../database";

export class DashboardQueries {
  async fiveMostExpensive(): Promise<{name: string, price: number}[]> { try { 
    const conn = await client.connect() 
    const sql = 'SELECT name, price FROM products ORDER BY price DESC LIMIT 5'

    const result = await conn.query(sql)

    conn.release()

    return result.rows
    } catch (err) {
      throw new Error(`unable get products by price: ${err}`)
    } 
  }
  
  // Get all users that have made orders
  async usersWithOrders(): Promise<{firstName: string, lastName: string}[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT first_name, last_name FROM users INNER JOIN orders ON users.id = orders.user_id'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get users with orders: ${err}`)
    } 
  }

  // Get all products that have been included in orders
  async productsInOrders(): Promise<{name: string, price: number, order_id: string}[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT name, price, order_id FROM products INNER JOIN order_products ON product.id = order_products.id'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`)
    } 
  }
}