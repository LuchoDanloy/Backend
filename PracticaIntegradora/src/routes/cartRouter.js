import { Router } from "express";
import { list, getOne, saveCart, saveProductCart } from "../controllers/cartController.js";

const cartRouter = Router();

//GET DE TODOS LOS CARTS
cartRouter.get('/', list);

//GET CON ID
cartRouter.get('/:cid', getOne);

//POST CART
cartRouter.post('/', saveCart)

//POST PRODUCT CART
cartRouter.post('/:cid/product/:pid', saveProductCart)

export default cartRouter;