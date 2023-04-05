//const fs = require('fs');
import fs from 'fs'

class ProductManager{

    constructor(path){
        this.path = path;
    }

    async getProducts(){
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

    async addProduct(product){

        try{
            //PRIMERO LEO EL ARCHIVO PARA OBTENER LA INFO EN UN ARREGLO Y PODER CHEQUEAR QUE YA NO EXISTA EL PRODUCTO
            let array = await this.getProducts();


            if(array){
                const existeCode = array.find((producto) => producto.code == product.code);

                if(existeCode){
                    console.log(`El code ${product.code} ya existe en el archivo!`);
                    return;
                }  
            } 
            
            //recupero los ids de los productos 
            let ids = array.map(product => product.id);
            //sumo uno al maximo para asignar como id al nuevo product
            let idAuto = ids.length > 0 ? Math.max(...ids) + 1 : 1

            array.push({...product, id: idAuto });

            await fs.promises.writeFile(this.path, JSON.stringify(array));
            return "Producto cargado con exito!";
        
        }
        catch(error){
            console.log(error);
        }

    }

    async getProductById(productId){

        try{
            const fileProductos = await fs.promises.readFile(this.path, { encoding: 'utf-8' });
            
            const array = JSON.parse(fileProductos);

            const product = array.find((product)=> product.id === productId );

            if(!product){
                return "id no encontrado dentro del archivo.";
            }

            return product;
        }
        catch(error){
            return "El archivo no existe."
        }

    }

    async updateProduct(id, newProduct){
        
        try{
            
            //primero obtengo el arreglo de productos completo
            const fileProductos = await fs.promises.readFile(this.path, { encoding: 'utf-8' });
            const arrayProducts = JSON.parse(fileProductos);

            //luego busco el id especifico
            const product = await this.getProductById(id);
           
            //si el producto no existe salimos (ya avisa el log del getProductById)
            if (!product){
                return;
            }
            
            const index = arrayProducts.findIndex((p)=> id===p.id);
            arrayProducts.splice(index,1,{...product,id, ...newProduct});

            await fs.promises.writeFile(this.path, JSON.stringify(arrayProducts));

            return "Producto modificado con exito!";
        }
        catch(error){
            console.log(error);
        }
    }


    async deleteProduct(productID){
        try{
            //primero obtengo el arreglo de productos completo
            const fileProductos = await fs.promises.readFile(this.path, { encoding: 'utf-8' });
            const array = JSON.parse(fileProductos);

            const productos = array.find((product)=> product.id ===productID );

            //si no lo encuentra sale
            if(!productos){
                console.log("id no encontrado dentro del archivo.");
                return;
            }   

            //filtramos el arreglo sacando el objeto con ese id
            const newArray = array.filter(product => product.id !== productID);

            //escribimos
            await fs.promises.writeFile(this.path, JSON.stringify(newArray));
            return "Producto Eliminado con exito!";

        }
        catch(error){
            console.log(error);
        }       



    }
}

export default ProductManager;

/* const main = async() => {
    const Product1 = new ProductManager("./prueba.json");
 
//getProducts
    const productos = await Product1.getProducts();
    console.log(productos);

//addProduct
    await Product1.addProduct({title: "producto prueba",
                    description: "Este es un producto prueba",
                    price: 200,
                    thumbnail: "Sin imagen",
                    code: "abc123",
                    stock: 25
                    }); 

    console.log(productos);

//getProductById                
    const byid = await Product1.getProductById(1);
    console.log(byid);

//updateProduct
    const pruebaUpdate = await Product1.updateProduct(1, {price: 500});
    console.log(pruebaUpdate);

//deleteProduct
    const deleteadpo = await Product1.deleteProduct(1);
    console.log(deleteadpo);


}

main(); */

