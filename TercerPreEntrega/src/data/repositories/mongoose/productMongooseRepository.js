import productSchema from "../../models/mongoose/productSchema.js";
import Product from '../../../domine/entities/product.js';

class productMongooseRepository{

    async getProducts(limit, query, sort){
        try{    
              
            const filtro = eval("({" + query + "})");

            const productDocument = await productSchema.aggregate([
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

            
            const products =  productDocument.map(document => new Product(
                document._id,
                document.title,
                document.description,
                document.code,
                document.price,
                document.status,
                document.stock,
                document.category,
                document.thumbnail               
            )); 
      
            return{
                products
            }

        }
        catch(error){
            console.error(error);
        }
    }

    async addProduct(product){
        try{
            const productDocument = await productSchema.create(product);
            return new Product(
                productDocument._id,
                productDocument.title,
                productDocument.description,
                productDocument.code,
                productDocument.price,
                productDocument.status,
                productDocument.stock,
                productDocument.category,
                productDocument.thumbnail
            ); 
        }
        catch(error){
            console.log(error);
        }
    }

    async getProductById(pid){

        try{
            const productDocument= await productSchema.findOne({_id: pid});
            return new Product(
                productDocument._id,
                productDocument.title,
                productDocument.description,
                productDocument.code,
                productDocument.price,
                productDocument.status,
                productDocument.stock,
                productDocument.category,
                productDocument.thumbnail
            ); 
        }
        catch(error){
            console.error(error);
        }

    }

    async updateProduct(pid, newProduct){
        
        try{
            const productDocument = productSchema.updateOne({_id: pid}, newProduct);

            if(!productDocument)
            {
              throw new Error('Product dont exist.');
            }

            return new Product(
                productDocument._id,
                productDocument.title,
                productDocument.description,
                productDocument.code,
                productDocument.price,
                productDocument.status,
                productDocument.stock,
                productDocument.category,
                productDocument.thumbnail
            ); 
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

export default productMongooseRepository;
