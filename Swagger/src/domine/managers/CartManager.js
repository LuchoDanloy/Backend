import container from "../../container.js";
import productManager from "../managers/ProductManager.js"
import ticketManager from "../managers/ticketManager.js";

class CartManager{

    constructor(){
        this.cartRepository =  container.resolve('CartRepository');
    }

    async getCarts(){
        try{
            return this.cartRepository.getCarts();
        }
        catch(error){
            console.error(error);
        }
    }

    async getCartById(cid){

        try{
            return this.cartRepository.getCartById(cid)
        }
        catch(error){
            console.log(error);
            return "El archivo no existe."
        }

    }

    async addCart(cart){

        try{
            return this.cartRepository.addCart(cart);
        }
        catch(error){
            console.log(error);
        }

    }
    async addProduct(cid, pid){

        try{

            //PRIMERO RECUPERO EL CARRITO CON SUS PRODUCTOS
            let cartProducts = await this.cartRepository.getCartById(cid);//posiblemente vaya el await
            
            //SI EL CARRITO NO EXISTE DAMOS AVISO Y SALIMOS
            if(!cartProducts){
                return `El Carrito ${cid} no existe!`;
            } 

            //Para saber si existe el id de producto dentro del arreglo de "products"
            const productExist = cartProducts.products.find((producto) => producto.product === pid);

            //si el producto existe hacemos un update
            if(productExist){

                productExist.quantity +=1;
                
                return this.cartRepository.updateCart(cid, cartProducts)

            }else{
                //si no existe el producto lo creamos


                cartProducts.products.push({product : pid, quantity : 1 })

                return this.cartRepository.updateCart(cid, cartProducts)
            }    
        }
        catch(error){
            console.log(error);
        }

    }


    async deleteProductCart(cid, pid){
        
        try{                   
            //PRIMERO RECUPERO EL CARRITO CON SUS PRODUCTOS
            let cartProducts = await this.cartRepository.getCartById(cid);
           
            console.log("Cart:");
            console.log(cartProducts);
           
            //SI EL CARRITO NO EXISTE DAMOS AVISO Y SALIMOS
            if(!cartProducts){
                return `El Carrito ${cid} no existe!`;
            } 

            //Para saber si existe el id de producto dentro del arreglo de "products"
            const productExist = cartProducts.products.find((producto) => producto.product._id == pid);

            //si el producto existe hacemos un update sin ese producto
            if(productExist){

                const productIndex = cartProducts.products.indexOf(pid);
                const newCartProducts = cartProducts.products.splice(productIndex,1);

                //ASIGNO LOS PRODUCTOS SIN EL QUE QUIERO EILIMINAR
                cartProducts.products = newCartProducts

                return this.cartRepository.updateCart(cid, cartProducts);

            }else{
                return `El Producto ${pid} no existe dentro del carrito!`;
            }   

        }
        catch(error){
            console.error(error);
        }  

    } 

    async deleteAllProductsCart(cid){

        try{   
            //PRIMERO RECUPERO EL CARRITO CON SUS PRODUCTOS
            let cartProducts = await this.cartRepository.getCartById(cid);

            //SI EL CARRITO NO EXISTE DAMOS AVISO Y SALIMOS
            if(!cartProducts){
                return `El Carrito ${cid} no existe!`;
            }
            
            //UNA VEZ QUE SE QUE EXISTE LIMPIO EL ARRAY DE PRODUCTS.
            cartProducts.products=[];
            return this.cartRepository.updateCart(cid, cartProducts);
        }
        catch(error){
            console.error(error);
        }  

    }

    async updateProductsCart(cid, newProducts){
        try{ 
            //PRIMERO RECUPERO EL CARRITO CON SUS PRODUCTOS
            let cartProducts = await this.cartRepository.getCartById(cid);

            //SI EL CARRITO NO EXISTE DAMOS AVISO Y SALIMOS
            if(!cartProducts){
                return `El Carrito ${cid} no existe!`;
            }
            
            //UNA VEZ QUE SE QUE EXISTE AIGNO EL NUEVO ARRAY DE PRODUCTOS.
            cartProducts.products = newProducts;
            return this.cartRepository.updateCart(cid, cartProducts);            
        }
        catch(error){
            console.error(error);
        } 
    }

    async updateProductQuantity(cid, pid, newQuantity){
        try{
            //PRIMERO RECUPERO EL CARRITO CON SUS PRODUCTOS
            let cartProducts = await this.cartRepository.getCartById(cid);
            
            //SI EL CARRITO NO EXISTE DAMOS AVISO Y SALIMOS
            if(!cartProducts){
                return `El Carrito ${cid} no existe!`;
            } 

            //Para saber si existe el id de producto dentro del arreglo de "products"
            const productExist = cartProducts.products.find((producto) => producto.product._id == pid);

            console.log("productExist:");
            console.log(productExist);

            //si el producto existe hacemos un update al quantity
            if(productExist){

                productExist.quantity = newQuantity

                return this.cartRepository.updateCart(cid, cartProducts);

            }else{
                return `El Producto ${pid} no existe dentro del carrito!`;
            }   

        }
        catch(error){
            console.error(error);
        }
    }

    async savePurchase(cid){

        try{   
            //PRIMERO RECUPERO EL CARRITO CON SUS PRODUCTOS
            let cartProducts = await this.cartRepository.getCartById(cid);

            //SI EL CARRITO NO EXISTE DAMOS AVISO Y SALIMOS
            if(!cartProducts){
                return `El Carrito ${cid} no existe!`;
            }
            
            //UNA VEZ QUE TENEMOS EL CARRITO VAMOS A COMRPOBAR LA CANTIDAD DE LOS PRODUCTOS Y SUS STOCKS
            
            const prodmanager = new productManager();

            for (const product of cartProducts.products) {

                let stockProduct = await prodmanager.chekStockProduct(product.product.id, product.quantity);
        

                if (!stockProduct) {
                    throw new Error(`El producto ${product.product.id} no tiene el stock necesario para realizar la compra!`);
                }
            }

            /*SI LLEGO ACA ES PORQUE TODOS LOS PRODUCTOS TIENEN STOCK. 
            VAMOS A DESCONTAR ESOS PRODUCTOS DEL STOCK       */

            for (const product of cartProducts.products) {
                await prodmanager.subStockProduct(product.product.id, product.quantity);
            }


            /*COMPRA FINALIZADA - CREAR TICKET DE COMPRA
            1-GENERAR TICKET
            2-ENVIAR POR MAIL
            3-BORRAR CARRITO DE COMPRAS     */
            
            const user = req.user;
            console.log(user);

/*             const data = {
                "code":"123",
                "purchase_datetime": Date().toLocaleString(),
                "amount": "123",
                "purchaser":"luciano@gmail.com"
            }

            console.log("Data:****************************")
            console.log(data)

            const tickmanager = new ticketManager();
            let ticket = await tickmanager.create(data);
            return ticket */


        }
        catch(error){
            console.error(error);
        }  

    }

    

}

export default CartManager;
