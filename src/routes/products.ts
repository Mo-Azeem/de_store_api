import Product, { IProduct } from "../models/products";
import { Router, Request, Response } from "express";
import { validateProduct, parseToNumber, validateANumericField } from "../utils/validators";
import { jwtVerfier } from "./middleware";

const store = new Product();

const index = async (_: Request, res: Response) => {
  res.json(await store.all());
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {    
    const new_product: IProduct = {
      name: req.body.name,
      price: validateANumericField(req.body.price, "price"),
      seller: req.body.seller,
      summary: req.body.summary,
      category: req.body.category,
    };     
    validateProduct(new_product);
    const created_product = await store.create(new_product);

    res.status(200).json(created_product);
  } catch (err){
    res.json(err);    
  }
};

const get = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await store.get(parseToNumber(req.params.id, "ID"));
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err); 
  }
};

const getByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = (req.params.category as string).toLowerCase();
    const products = await store.getByCategory(category);
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json(err);
  }
};

const router: Router = Router();

router.get("/", index);
router.get("/:id", get);
router.get("/category/:category", getByCategory);
router.post("/", jwtVerfier, create);

export default router;
