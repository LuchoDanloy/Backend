import { Router } from "express";
import CartManager from "./CartManager.js";

const cart1 = new CartManager("./carrito.json");

const cartRouter = Router();

cartRouter.get('/', async (req,res)=>{
    const carts = await cart1.getCarts();
    res.status(200).json(carts);
})

//GET CON ID
cartRouter.get('/:cid', async (req,res)=>{
    const cartId = +req.params.cid;
    const products = await cart1.getCartById(cartId);
    res.status(200).json(products);
})

//POST
cartRouter.post('/', async (req,res)=>{
    const products = req.body 
    await cart1.addCart(products);
    res.status(201).json(products);
})

//POST PRODUCT
cartRouter.post('/:cid/product/:pid', async (req,res)=>{
    const cartId = +req.params.cid;
    const productId = +req.params.pid;
    const respuesta = await cart1.addProduct(cartId,productId);
    res.status(201).json(respuesta);
})

export default cartRouter;