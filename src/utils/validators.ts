/*
  A lots of, lots of errors thrown here and there.

  "The things I do for input validation..."
  - Unknown Developer
*/

import { CredentialsError, ValidationError } from "./Errors";
import { IUser } from "../models/users";
import { IProduct } from "../models/products";

const validateUserNotEmpty = (user: IUser, password: string): void => {
  if (!user.username) throw new ValidationError("username Isn't Provided.");
  if (!user.first_name) throw new ValidationError("first_name Isn't Provided.");
  if (!user.last_name) throw new ValidationError("last_name Isn't Provided.");
  if (!password) throw new ValidationError("password Isn't Provided.");
};

const validateUserLength = (user: IUser, password: string): void => {
  if (user.username.length < 8)
    throw new ValidationError(
      "username needs to be at least 8 characters long."
    );
  if (password.length < 8)
    throw new ValidationError(
      "password needs to be at least 8 characters long."
    );
};

const validateProductNotEmpty = (product: IProduct) => {
  if (!product.name) throw new ValidationError("product Name Isn't Provided.");
  if (!product.price) throw new ValidationError("price Isn't Provided.");
  if (!product.summary) throw new ValidationError("summary Isn't Provided.");
  if (!product.category) throw new ValidationError("category Isn't Provided.");
  if (!product.seller) throw new ValidationError("seller Isn't Provided.");
};

const validateProductLength = (product: IProduct) => {
  if (product.name.length < 5)
    throw new ValidationError(
      "name needs to be at least 5 characters long."
    );
  if (product.seller.length < 5)
    throw new ValidationError(
      "seller name needs to be at least 5 characters long."
    );
  if (product.summary.length < 15)
    throw new ValidationError(
      "summary needs to be at least 15 characters long."
    );
  if (product.category.length < 4)
    throw new ValidationError(
      "category needs to be at least 4 characters long."
    );
};

export const validateOrderStatus = (status: string): string => {
  if (status !== "active" && status !== "complete")
    throw new ValidationError(
      'status must be either "active" or "complete".'
    );
  return status;
};

export const validateANumericField = (total: string, fieldType: string): number => {
  if(!total) throw new ValidationError(fieldType + " Isn't Provided")
  return parseToNumber(total, fieldType)
}

export const signInValidate = (username: string, password: string): void => {
  if (!username) throw new CredentialsError("username isn't Provided.");
  if (!password) throw new CredentialsError("password isn't Provided.");
};

export const signUpValidate = (user: IUser, password: string): void => {
  validateUserNotEmpty(user, password);
  validateUserLength(user, password);
};

export const validateProduct = (product: IProduct): void => {
  validateProductNotEmpty(product);
  validateProductLength(product);
};

/*
  This method is heavily used for parsing IDs, prices, and anything
  that relates to numbers. The thing is, parseInt and parseFloat convert 
  "13fdskmfd" to 13, simply it removes any character if the string 
  starts with a number. This isn't good validation. 
  So, a string check up with a regExp is required. 
*/

export const parseToNumber = (value: string, fieldType: string): number => {
  if (/[a-zA-Z]/g.test(value))
    throw new ValidationError(fieldType + " Must Be A Number");
  return parseFloat(value);
};
