import CartManager from "../managers/CartManager.js";

export const list = async (req, res)=>{
    const manager = new CartManager();

    const carts = await manager.getCarts();

    res.send({status: 'success', carts })
};

export const getOne = async (req, res)=>{

    const { cid }= req.params;

    const manager = new CartManager();
    
    const cart = await manager.getCartById(cid);
    res.send({status: 'success', cart })
};

export const saveCart = async (req, res)=>{

    const manager = new CartManager();

    const cart = await manager.addCart(req.body)
    res.send({status: 'success', cart, message: 'Cart created.' })
};

export const saveProductCart = async (req, res)=>{
    const { cid }= req.params;
    const { pid }= req.params;

    const manager = new CartManager();

    const cart = await manager.addProduct(cid, pid)
    res.send({status: 'success', cart, message: 'Cart created.' })
};


