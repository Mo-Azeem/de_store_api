import Order, { IOrder, IOrderProducts } from "../models/orders";
import { Router, Request, Response } from "express";
import { parseToNumber, validateANumericField } from "../utils/validators";
import { jwtVerfier } from "./middleware";
import { validateOrderStatus } from "../utils/validators";
import { getToday } from "../utils/utils";

const store = new Order();

const index = async (_: Request, res: Response): Promise<void> => {
  res.json(await store.all());
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const new_order: IOrder = {
      user_id: validateANumericField(req.body.user_id, "user_id"),
      status: validateOrderStatus(req.body.status),
      placing_date: getToday(),
      total: validateANumericField(req.body.total, "total"),
    };
    res.json(await store.create(new_order));
  } catch (err) {
    res.status(400).json(err);
  }
};

const get = async (req: Request, res: Response): Promise<void> => {
  try {
    res.json(await store.get(parseToNumber(req.params.id, "OrderID")));
  } catch (err) {
    res.status(400).json(err);
  }
};

const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderProduct: IOrderProducts = {
      order_id: validateANumericField(req.body.order_id, "order_id"),
      product_id: validateANumericField(req.body.product_id, "product_id"),
      quantity: validateANumericField(req.body.quantity, "quantity"),
    };
    res.json(await store.addProduct(orderProduct));
  } catch (err) {
    res.status(400).json(err);
  }
};

const router: Router = Router();

router.get("/",jwtVerfier, index);
router.get("/:id",jwtVerfier, get);
router.post("/", jwtVerfier, create);
router.post("/add-product", jwtVerfier, addProduct);

export default router;
