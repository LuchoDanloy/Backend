import productSchema from "./models/cartSchema.js"

class cartMongooseDao{

    async getCarts(){
        try{    
            const cartsDocument = await productSchema.find();   
            return cartsDocument.map(document=>({
                id: document._id,
                products: document.products            
            })) //como quier devolver un objeto lo tengo que poner entre parentesis (). Si dejo las llaves {} solas interpreta que esta abriendo una funcion.
        }
        catch(error){
            console.error(error);
        }
    }

    async getCartById(cid){

        try{
            const cartDocument = await productSchema.findOne({_id: cid});
            return {
                id: cartDocument._id,
                products: cartDocument.products
            } 
        }
        catch(error){
            console.error(error);
        }

    }

    async addCart(cart){
        try{
            const cartDocument = await productSchema.create(cart);
            return {
                id: cartDocument._id,
                products: cartDocument.products
            } 
        }
        catch(error){
            console.log(error);
        }
    }

    async updateCart(idCart, newCart){
        
        try{
            return productSchema.updateOne({_id: idCart}, newCart);
        }
        catch(error){
            console.error(error);
        }
    }

}

export default cartMongooseDao;
