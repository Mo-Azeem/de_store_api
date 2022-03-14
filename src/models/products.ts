import { ProductNotFound } from "../utils/Errors";
import Model,{ run } from "../database/lib/model";

export interface IProduct {
  name: string;
  summary: string;
  price: number;
  seller: string;
  category: string;
}

export default class Product extends Model<IProduct> {
  constructor() {
    //specifying the table name
    super("products");
  }

  async get(id: number): Promise<IProduct> {
    const result = await super.get(id);

    if (!result)
      throw new ProductNotFound(`Product with ID: ${id} isn't found.`);

    return result;
  }

  async getByCategory(category: string): Promise<IProduct[]> {
    const result = await run<IProduct>(`
            SELECT * FROM ${this.table_name}
                WHERE category LIKE '%${category}%';
        `);

    if (!result.length)
      throw new ProductNotFound(
        `Products with category: ${category} aren't found.`
      );

    return result;
  }
}
