import productMongooseDao from "../dao/productMongooseDao.js"

class ProductManager{

    constructor(){
        this.dao = new productMongooseDao();
    }

    async getProducts(limit){
        try{
            const products = await this.dao.getProducts();    //van sin await en caso de retornar directamente porque ya va a estar el await en el Controller cuando sea invocado.

            //si el limite es mayor a cero lo filtro y retorno el nuevo arreglo
            if (limit > 0){
                const productsLimit = products.slice(0,limit);
                return productsLimit;
            };
            
            return products;

        }
        catch(error){
            console.error(error);
        }
    }

    async addProduct(product){

        try{
            return this.dao.addProduct(product);
        }
        catch(error){
            console.log(error);
        }
    }

    async getProductById(pid){

        try{
            return this.dao.getProductById(pid);
        }
        catch(error){
            console.error(error);
        }

    }

    async updateProduct(pid, newProduct){
        
        try{
            return this.dao.updateProduct(pid, newProduct);
        }
        catch(error){
            console.error(error);
        }
    }


    async deleteProduct(pid){
        try{
            return this.dao.deleteProduct(pid);
        }
        catch(error){
            console.error(error);
        }       
    }
}

export default ProductManager;
