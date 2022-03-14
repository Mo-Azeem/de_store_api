import { Router } from "express";
import users from "./users";
import products from "./products";
import orders from "./orders";
import { logger } from "./middleware";

const router: Router = Router();

if(process.env.ENV === 'dev')
    router.use(logger);

router.use("/users", users);
router.use("/products", products);
router.use("/orders", orders);

export default router;
