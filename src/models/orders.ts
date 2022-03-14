import Model, { run } from "../database/lib/model";
import { separate } from "../database/lib/utils";
import { OrderNotFound, OrderProductExists, ProductNotFound, UserNotFound } from "../utils/Errors";

export interface IOrder {
  user_id: number;
  placing_date: string;
  status: string;
  total: number;
}

export interface IOrderProducts {
  order_id: number;
  product_id: number;
  quantity: number;
}

export default class Order extends Model<IOrder> {
  constructor() {
    //specifying the table name
    super("orders");
  }

  async addProduct(item: IOrderProducts): Promise<IOrderProducts[]> {
    const _ = separate<IOrderProducts>(item);
    
    const order = await run(`
      SELECT * FROM orders
        WHERE id = ${item.order_id};
    `)
    
    const product = await run(`
      SELECT * FROM products
        WHERE id = ${item.product_id};
    `)
    
    if(!order.length) 
      throw new OrderNotFound(`Order with ID: ${item.order_id} isn't found.`)
    
    if(!product.length) 
      throw new ProductNotFound(`Product with ID: ${item.product_id} isn't found.`)
    
    try {
      return await run(`
        INSERT INTO order_products 
        (${_.columns}) VALUES (${_.values})
        RETURNING ${_.columns};
    `);
    } catch {
      throw new OrderProductExists("Order with the same product already exists.")
    }
  }

  async get(id: number): Promise<IOrder> {
    const result = await super.get(id);
    if (!result) throw new OrderNotFound(`Order with ID: ${id} isn't found.`);
    return result;
  }

  async create(item: IOrder): Promise<IOrder> {
     try {
       return await super.create(item)
     } catch (err) {
       throw new UserNotFound(`User with ID: ${item.user_id} is not found`)
     }
  }
  
  // End Order
}
