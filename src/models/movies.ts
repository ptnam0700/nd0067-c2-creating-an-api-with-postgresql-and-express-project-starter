import client from "../database";

// @ts-ignore
export type Movie = {
  id: number;
  title: string;
  genre: string;
  movie_length: number;
  created_by?: string;
}

export class MovieStore {
  async index(): Promise<Movie[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM movies';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get movies ${error}`);
    }
  }

  async create(m: Movie): Promise<Movie> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = 'INSERT INTO movies(title, genre, movie_length) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [m.title, m.genre, m.movie_length]);
      const movie = result.rows[0];
      conn.release();
      return movie;
    } catch (error) {
      throw new Error(`Cannot add movie ${error}`);
    }
  }

  async delete(id: number): Promise<Movie[]> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM movies WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot delete movie ${error}`);
    }
  }
}