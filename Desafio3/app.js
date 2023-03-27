import express from 'express';
import ProductManager from './ProductManager.js';


const product1 = new ProductManager("./prueba.json");

const app = express();

app.use(express.urlencoded({extended:true}));

app.get('/products', async (req, res) => {
    
    //obtengo el contenido
    const products = await product1.getProducts();

    //si esta vacio cargo el archivo con 25 productos aleatorios
    if (products.length == 0){
        console.log("cargando productos");
        for(var i=1; i<26; i++){
            await product1.addProduct({
                            title: `producto ${i}` ,
                            description: `Este es el producto  ${i}`,
                            price: 200 + i,
                            thumbnail: "Sin imagen",
                            code: `abc${i}` ,
                            stock: 25
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
        res.send(productsLimit);
        return;
    }; 

    res.send(products);
});

app.get('/products/:pid', async (req, res) => {
    const productId = +req.params.pid;
    const product = await product1.getProductById(productId);
    res.send(product);
});

app.listen(8080, () => {
    console.log('Servidor escuchando en el puerto 8080');
});