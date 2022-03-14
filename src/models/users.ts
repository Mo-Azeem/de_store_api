import Model, { run } from "../database/lib/model";
import { compare, formatOrderProducts } from "../utils/utils";
import {
  CredentialsError,
  AccountCreationError,
  UserNotFound,
} from "../utils/Errors";

export interface IUser {
  username: string;
  hashed_password: string;
  first_name: string;
  last_name: string;
}

export default class User extends Model<IUser> {
  constructor() {
    super("users");
  }
  async get(id: number): Promise<IUser> {
    const user: IUser = await super.get(id);

    if (!user) throw new UserNotFound("User Not Found");

    return user;
  }

  async create(object: IUser): Promise<IUser> {
    try {
      return await super.create(object)
    } catch (err) {
      throw new AccountCreationError("User Already Exists." + err);
    }
  }

  async auth(username: string, password: string): Promise<IUser> {
    const result = await run<IUser>(`
            SELECT * FROM ${this.table_name}
                WHERE username = '${username}';
        `);

    if (!result.length) throw new CredentialsError("No User Found.");

    const user: IUser = result[0];

    if (!compare(password, user.hashed_password))
      throw new CredentialsError("Wrong Username/Password");

    return user;
  }

  async getUserOrder(user_id: number, status: string = "") {
    const username = await run<IUser>(`
      SELECT username FROM users 
          WHERE id = ${user_id};`);
    
    if(!username.length)
      throw new UserNotFound(`User with ID: ${user_id} isn't found.`)

    let query: string = `
      SELECT * FROM orders
          JOIN order_products
              ON order_products.order_id = orders.id
          JOIN products
              ON products.id = order_products.product_id
      WHERE orders.user_id = ${user_id}`
      
    query = status !== 'active' ? 
      query : query.concat(` AND orders.status = '${status}'`)

    const orders_products = await run<any>(query);
    
    return {
      username: username[0].username,
      orders: formatOrderProducts(orders_products as any),
    };
  }
}
