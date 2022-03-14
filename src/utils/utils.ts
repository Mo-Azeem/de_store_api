import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../models/users";
import { JWTTokenError, ValidationError } from "./Errors";

export const hash = (password: string): string => {
  return bcrypt.hashSync(
    password + process.env.PEPPER_SECRET_WORD,
    parseInt(process.env.SALT_ROUNDS as string)
  );
};

export const compare = (password: string, hashed_password: string): boolean => {
  return bcrypt.compareSync(
    password + process.env.PEPPER_SECRET_WORD,
    hashed_password
  );
};

export const signJWT = (user: IUser): string => {
  return jwt.sign(
    {
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name
    },
    process.env.JWT_SIGNUTURE as string,
    // JWT is valid for one day, otherwise, re authntication is required
    { expiresIn: "1d" }
  );
};

export const verfiyJWT = (authorization: string) => {
  const token = authorization?.split(" ")[1];
  if (!token) throw new JWTTokenError("Token Isn't Provided.");
  try {
    jwt.verify(token, process.env.JWT_SIGNUTURE as string);
  } catch (err) {
    throw new JWTTokenError("Invalid JWT Token.");
  }
  return true;
};

const formatproducts = (result: [], order_id: number) => {
  const filtered_results = result.filter(
    (item: any) => item.order_id === order_id
  );
  return filtered_results.map((item: any) => ({
    product_id: item.product_id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    seller: item.seller,
    category: item.category,
  }));
};

export const formatOrderProducts = (result: []) => {
  let current_order_id = 0;
  let orders: any = {};
  result.map((item: any) => {
    if (item.order_id !== current_order_id) {
      current_order_id = item.order_id;
      orders[current_order_id] = {
        order_id: current_order_id,
        total: item.total,
        status: item.status,
        placing_date: item.placing_date,
        products: formatproducts(result, current_order_id),
      };
    }
  });
  return orders;
};
