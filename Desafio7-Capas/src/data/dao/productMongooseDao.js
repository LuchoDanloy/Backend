import productSchema from "../models/productSchema.js"

class productMongooseDao{

    async getProducts(limit, query, sort){
        try{    
              
            const filtro = eval("({" + query + "})");

            const studentsDocumen = await productSchema.aggregate([
                {
                    $limit: parseInt(limit)
                },
                {
                    $sort: {
                        price: sort
                    }
                },
                {
                    $match: filtro
                },
            ]);

            
            return studentsDocumen.map(document=>({
                id: document._id,
                title: document.title,
                description: document.description,
                code: document.code,
                price: document.price,
                status:document.status,
                stock: document.stock,
                category: document.category,
                thumbnail: document.thumbnail               
            })) //como quier devolver un objeto lo tengo que poner entre parentesis (). Si dejo las llaves {} solas interpreta que esta abriendo una funcion.
      

        }
        catch(error){
            console.error(error);
        }
    }

    async addProduct(product){
        try{
            const productDocument = await productSchema.create(product);
            return {
                id: productDocument._id,
                title: productDocument.title,
                description: productDocument.description,
                code: productDocument.code,
                price: productDocument.price,
                status:productDocument.status,
                stock: productDocument.stock,
                category: productDocument.category,
                thumbnail: productDocument.thumbnail
            } 
        }
        catch(error){
            console.log(error);
        }
    }

    async getProductById(pid){

        try{
            const productDocument= await productSchema.findOne({_id: pid});
            return {
                id: productDocument._id,
                title: productDocument.title,
                description: productDocument.description,
                code: productDocument.code,
                price: productDocument.price,
                status:productDocument.status,
                stock: productDocument.stock,
                category: productDocument.category,
                thumbnail: productDocument.thumbnail
            } 
        }
        catch(error){
            console.error(error);
        }

    }

    async updateProduct(pid, newProduct){
        
        try{
            return productSchema.updateOne({_id: pid}, newProduct);
        }
        catch(error){
            console.error(error);
        }
    }


    async deleteProduct(pid){
        try{
            return productSchema.deleteOne({_id: pid});
        }
        catch(error){
            console.error(error);
        }       
    }
}

export default productMongooseDao;
