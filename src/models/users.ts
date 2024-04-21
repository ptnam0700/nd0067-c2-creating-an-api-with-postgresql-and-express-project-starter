import dotenv  from 'dotenv';
import bcrypt from 'bcrypt'
import client from '../database';

export type User = {
  id: string;
  username: string;
  password: string;
  password_digest: string;  
}

dotenv.config();
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS || "";

export class UserStore {
  
  async create(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'INSERT INTO users (username, password_digest) VALUES($1, $2) RETURNING *'
  
      const hash = bcrypt.hashSync(
        u.password + pepper, 
        parseInt(saltRounds)
      );
  
      const result = await conn.query(sql, [u.username, hash])
      const user = result.rows[0]
  
      conn.release()
  
      return user
    } catch(err) {
      throw new Error(`unable create user (${u.username}): ${err}`)
    } 
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await client.connect();
    const sql = 'SELECT * FROM users WHERE username=($1)';

    const result = await conn.query(sql, [username]);

    if(result.rows.length) {
      const user: User = result.rows[0];

      if(bcrypt.compareSync(password + pepper, user.password_digest)) {
        return user;
      }
    }

    return null;
  }
}