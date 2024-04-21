import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV
} = process.env

let client: Pool;

if (ENV === 'test' || ENV === 'dev') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: ENV === 'test' ? POSTGRES_TEST_DB : POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
} else {
  throw new Error('Invalid environment. Supported environments are "test" and "dev".');
}

export default client;