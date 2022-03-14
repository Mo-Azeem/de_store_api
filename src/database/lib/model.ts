import connector from "./connector";
import { separate } from "./utils";

interface IModel<T> {
  all(): Promise<T[]>;
  get(id: number): Promise<T>;
  getBy(column_name: string, value: string | number): Promise<T[]>;
  create(object: T): Promise<T>;
  delete(id: number): Promise<T[]>;
  update(id: number, column: string, value: string): Promise<T>;
}

export async function run<T>(sql: string): Promise<T[]> {
  const c = await connector.connect();
  const results = await c.query(sql);
  c.release();
  return results.rows;
}

export default class Model<T> implements IModel<T> {
  table_name: string;

  constructor(table_name: string) {
    this.table_name = table_name;
  }

  async update(id: number, column: string, value: string): Promise<T> {
    await run<T>(`
        UPDATE ${this.table_name}
        SET ${column} = '${value}'
        WHERE id = ${id};
    `)
    return await this.get(id)
  }

  async all(): Promise<T[]> {
    return await run<T>(`
        SELECT * FROM ${this.table_name}; 
    `);
  }

  async get(id: number): Promise<T> {
    const results: T[] = await run<T>(`
        SELECT * FROM ${this.table_name}
            WHERE ${this.table_name}.id = ${id}; 
        `);
    return results[0];
  }

  async getBy(column_name: string, _value: string | number): Promise<T[]> {
    const value = typeof _value === "string" ? `'${_value}'` : _value;
    return await run<T>(`
        SELECT * FROM ${this.table_name}
            WHERE ${column_name} = ${value};
        `);
  }

  async create(item: T): Promise<T> {
    const _ = separate(item);
    const result = await run<T>(`INSERT INTO ${this.table_name} (
            ${_.columns} ) VALUES (${_.values})

            RETURNING id, ${_.columns}
        `);
    return result[0]
  }

  async delete(id: number): Promise<T[]> {
    await run<T>(`DELETE FROM ${this.table_name}
        WHERE ${this.table_name}.id = ${id};
      `);
    return await this.all()
  }
}
