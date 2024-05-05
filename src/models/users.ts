import dotenv from "dotenv";
import bcrypt from "bcrypt";
import client from "../database";

export type UserInput = {
  firstname: string;
  lastname: string;
  password: string;
};

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  password_digest: string;
};

dotenv.config();
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS || "";

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";

      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: UserInput): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = "INSERT INTO users (firstname, lastname, password_digest) VALUES($1, $2, $3) RETURNING *";

      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));

      const result = await conn.query(sql, [u.firstname, u.lastname, hash]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`unable create user (${u.firstname}): ${err}`);
    }
  }

  async login(u: UserInput): Promise<User | null> {
    const conn = await client.connect();
    const sql = "SELECT * FROM users WHERE firstname=($1) AND lastname=($2)";

    const result = await conn.query(sql, [u.firstname, u.lastname]);

    if (result.rows.length) {
      const user: User = result.rows[0];

      if (bcrypt.compareSync(u.password + pepper, user.password_digest)) {
        return user;
      }
    }

    return null;
  }
}
