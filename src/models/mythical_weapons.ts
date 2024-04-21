import client from "../database";

export type Weapon = {
  id: Number;
  name: string;
  type: string;
  weight: number;
}

export class MythicalWeaponStore {
  async index(): Promise<Weapon[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM mythical_weapons';
      const result = await conn.query(sql);
      conn.release;
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get weapons ${error}`);
    }
  }
}