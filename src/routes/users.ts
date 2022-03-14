import User, { IUser } from "../models/users";
import { Router, Request, Response } from "express";
import { hash, signJWT } from "../utils/utils";
import { signUpValidate, signInValidate, validateANumericField } from "../utils/validators";
import { jwtVerfier } from "./middleware";

const store = new User();

const index = async (_: Request, res: Response): Promise<void> => {
  res.json(await store.all());
};

// for sign ups
const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const new_user: IUser = {
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      hashed_password: "" // will be hashed later if it meets the validation requirement
    };
    signUpValidate(new_user, req.body.password);
    const hashed_password: string = hash(req.body.password);
    new_user.hashed_password = hashed_password;
    const created_user = (await store.create(new_user)) as any;
    const user_jwt = signJWT(new_user)
    res.json({
      id: created_user.id,
      username: created_user.username,
      first_name: created_user.first_name,
      last_name: created_user.last_name,
      jwt: user_jwt
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await store.get(validateANumericField(req.params.id, "ID"));
    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

// for sign ins
const auth = async (req: Request, res: Response): Promise<void> => {
  try {
    /*
    The DB already forces lowercases on the username column,
    but only upon insertion and not selecting.
    Therefore, toLowerCase is needed before any SELECT operation.*/ 
    const username = (req.body.username as string)?.toLowerCase()
    const password = req.body.password
    signInValidate(username, password)
    const user = (await store.auth(username, password)) as any;
    const user_jwt = signJWT(user)
    res.json({
      id: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      jwt: user_jwt
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

const getCurrentOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await store.getUserOrder(
      validateANumericField(req.params.id, "UserID"),
      "active"
    );
    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

const allOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await store.getUserOrder(
      validateANumericField(req.params.id, "UserID")
    );
    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};


const users: Router = Router();

users.get("/", jwtVerfier, index);
users.post("/", create); // sign up
users.post("/auth", auth); // sign in
users.get("/:id", jwtVerfier, show);
users.get("/:id/current-order",jwtVerfier, getCurrentOrder);
users.get("/:id/orders",jwtVerfier, allOrders);

export default users;
