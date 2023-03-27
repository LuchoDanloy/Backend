class ProductManager{

    products = [];
    idAuto = 1;

    getProducts(){
        return this.products;
    }

    addProduct(product){

        const existeCode = this.products.find((producto) => producto.code == product.code);

        if(existeCode){
            throw Error(`El code ${product.code} ya existe!`);
            //console.error(`El code ${product.code} ya existe!`);    
        } 
    
        this.products.push({...product,
                            id: this.idAuto
                        });

        this.idAuto += 1;
    }

    getProductById(productId){
        const product = this.products.find((product)=> product.id === productId);

        if(!product){
            throw Error('Not Found');
            //console.error("Not Found");    
        }

        return product;
    }

}


const Product1 = new ProductManager();
console.log(Product1.getProducts());

Product1.addProduct({title: "producto prueba",
                    description: "Este es un producto prueba",
                    price: 200,
                    thumbnail: "Sin imagen",
                    code: "abc124",
                    stock: 25
                    });

console.log(Product1.getProducts());

Product1.addProduct({title: "producto prueba",
                    description: "Este es un producto prueba",
                    price: 200,
                    thumbnail: "Sin imagen",
                    code: "abc123",
                    stock: 25
                    });

console.log(Product1.getProducts());

console.log(Product1.getProductById(1));