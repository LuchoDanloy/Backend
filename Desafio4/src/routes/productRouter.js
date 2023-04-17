import { Router } from "express";
import ProductManager from "./ProductManager.js";
import {socketServer} from "../app.js"

const product1 = new ProductManager("./productos.json");

const productRouter = Router();

//GET TODOS LOS PRODUCTOS O LIMIT
productRouter.get('/', async (req,res)=>{

   //obtengo el contenido
   const products = await product1.getProducts();

   //si esta vacio cargo el archivo con 25 productos aleatorios
   if (products.length == 0){
       console.log("cargando productos");
       for(var i=1; i<26; i++){
           await product1.addProduct({
                           title: `producto ${i}` ,
                           description: `Este es el producto  ${i}`,
                           code: `abc${i}` ,
                           price: 200 + i,
                           status: true,
                           stock: 25,
                           category: "generica",
                           thumbnail: [],
           }); 
       } 
       res.send("archivo cargado con 25 productos!");
       return;
   }

   //obtengo el limit pasado por query param.
   let {limit} = req.query;

    //si el limite es mayor a cero lo filtro y retorno el nuevo arreglo
    if (limit > 0){
        const productsLimit = products.slice(0,limit);
        //EMIT PARA INFORMAR LOS PROUDUCTOS
        socketServer.emit('getProducts', productsLimit)
        res.status(200).json(productsLimit);
        return;
   }; 

   //EMIT PARA INFORMAR LOS PROUDUCTOS
   socketServer.emit('getProducts', products)

    res.status(200).json(products);
})

//GET CON ID
productRouter.get('/:pid', async (req,res)=>{
    const productId = +req.params.pid;
    const product = await product1.getProductById(productId);
    res.status(200).json(product);

    //EMIT PARA INFORMAR LOS PROUDUCTOS
    const products = [];
    products.push(product);
    socketServer.emit('getProducts', products)
})

//POST
productRouter.post('/', async (req,res)=>{

    const product = req.body;

    //agregamos el producto
    await product1.addProduct(product);

    const products = await product1.getProducts();
    //EMIT PARA INFORMAR LOS PROUDUCTOS
    socketServer.emit('getProducts', products)

    res.status(201).json(product);
})

//PUT
productRouter.put('/:pid', async (req,res)=>{

    const productId = +req.params.pid;
    const newProduct = req.body;

    //modificamos el producto
    await product1.updateProduct(productId,newProduct);

    const products = await product1.getProducts();
    //EMIT PARA INFORMAR LOS PROUDUCTOS
    socketServer.emit('getProducts', products)

    res.status(200).json(newProduct);
})

//DELETE
productRouter.delete('/:pid', async (req,res)=>{

    const productId = +req.params.pid;
    const respuesta = await product1.deleteProduct(productId);

    res.status(200).json(respuesta);
  
    //EMIT PARA INFORMAR LOS PROUDUCTOS
    const products = await product1.getProducts();
    socketServer.emit('getProducts', products)
})

export default productRouter;