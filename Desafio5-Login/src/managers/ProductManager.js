import productMongooseDao from "../dao/productMongooseDao.js"

class ProductManager{

    constructor(){
        this.dao = new productMongooseDao();
    }

    async getProducts(limit, query, sort){
        try{
            //LIMIT
            if (!limit){
                limit=10
            }
            //SORT
            if (!sort){
                sort = 1
            }else{
                if(sort=="asc" || sort=="desc"){
                    sort = sort == "asc" ? 1 : -1
                }else{
                    sort = 1
                }
            }

            return this.dao.getProducts(limit, query, sort);    //van sin await en caso de retornar directamente porque ya va a estar el await en el Controller cuando sea invocado.
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
