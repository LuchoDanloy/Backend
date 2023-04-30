import cartMongooseDao from "../dao/cartMongooseDao.js"

class CartManager{

    constructor(){
        this.dao = new cartMongooseDao();
    }

    async getCarts(){
        try{
            return this.dao.getCarts();
        }
        catch(error){
            console.error(error);
        }
    }

    async getCartById(cid){

        try{
            return this.dao.getCartById(cid)
        }
        catch(error){
            console.log(error);
            return "El archivo no existe."
        }

    }

    async addCart(cart){

        try{
            return this.dao.addCart(cart);
        }
        catch(error){
            console.log(error);
        }

    }
    async addProduct(cid, pid){

        try{

            //PRIMERO RECUPERO EL CARRITO CON SUS PRODUCTOS
            let cartProducts = await this.dao.getCartById(cid);//posiblemente vaya el await
            
            //SI EL CARRITO NO EXISTE DAMOS AVISO Y SALIMOS
            if(!cartProducts){
                return `El Carrito ${cid} no existe!`;
            } 

            //Para saber si existe el id de producto dentro del arreglo de "products"
            const productExist = cartProducts.products.find((producto) => producto.product === pid);

            //si el producto existe hacemos un update
            if(productExist){

                productExist.quantity +=1;
                
                return this.dao.updateCart(cid, cartProducts)

            }else{
                //si no existe el producto lo creamos


                cartProducts.products.push({product : pid, quantity : 1 })

                return this.dao.updateCart(cid, cartProducts)
            }    
        }
        catch(error){
            console.log(error);
        }

    }

}

export default CartManager;
