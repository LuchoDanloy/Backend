import fs from 'fs'

class CartManager{

    constructor(path){
        this.path = path;
    }

    async getCarts(){
        try{
            const fileProductos = await fs.promises.readFile(this.path, { encoding: 'utf-8' });
            return JSON.parse(fileProductos);
        }
        catch(error){
            console.log(`El archivo ${this.path} no existe. Creando archivo...`)
            await fs.promises.writeFile(this.path,'[]');
            return [];
        }
    }

    async addCart(products){

        try{
            //PRIMERO LEO EL ARCHIVO PARA OBTENER LA INFO
            let array = await this.getCarts();

            //recupero los ids de los carts 
            let ids = array.map(cart => cart.id);

            //sumo uno al maximo para asignar como id al nuevo cart
            let idAuto = ids.length > 0 ? Math.max(...ids) + 1 : 1

            array.push({ id: idAuto, ...products });

            await fs.promises.writeFile(this.path, JSON.stringify(array));
            return "Carrito cargado con exito!";
        
        }
        catch(error){
            console.log(error);
        }

    }
    async addProduct(idCart, idProduct){

        try{

            //PRIMERO RECUPERO LOS PRODUCTOS DEL CARRITO REQUERIDO
            let cartProducts = await this.getCartById(idCart);


            //SI EL CARRITO NO EXISTE DAMOS AVISO Y SALIMOS
            if(!cartProducts){
                return `El Carrito ${idCart} no existe!`;
            } 

            //Para saber si existe el id de producto dentro del arreglo de "products"
            const productExist = cartProducts.products.find((producto) => producto.product === idProduct);
            console.log(productExist);

            if(productExist){

                productExist.quantity +=1;
                //console.log([cartProducts]);
                await fs.promises.writeFile(this.path, JSON.stringify([cartProducts]));
                return "Producto sumado con exito!";
            }else{
                //si no existe lo creamos
                //cartProducts.products = ...cartProducts.products, { id: idProduct, quantity: 1 };

                cartProducts.products.push({product : idProduct, quantity : 1 })

                await fs.promises.writeFile(this.path, JSON.stringify([cartProducts]));
                return `Producto cargado con exito al carrito ${idCart}`;
            }   
        }
        catch(error){
            console.log(error);
        }

    }

    async getCartById(cartId){

        try{
            const fileCarts = await fs.promises.readFile(this.path, { encoding: 'utf-8' });
            
            const array = JSON.parse(fileCarts);

            const cart = array.find((cart)=> cart.id === cartId );

            if(!cart){
                return "id-Cart no encontrado dentro del archivo.";
            }

            return cart;
        }
        catch(error){
            console.log(error);
            return "El archivo no existe."
        }

    }


}

export default CartManager;
