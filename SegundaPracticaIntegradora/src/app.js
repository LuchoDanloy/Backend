import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";

import productRouter from './routes/productRouter.js'
import cartRouter from './routes/cartRouter.js';
import sessionRouter from './routes/sessionRouter.js';
import userRouter from './routes/userRouter.js';
import roleRouter from './routes/roleRouter.js'
import errorHandler from './middlewares/errorHandler.js';

void (async() =>
{

    //CONEXION CON MONGO-ATLAS
    await mongoose.connect('mongodb+srv://lucianodanloy:admin123@cluster0.brl6jiv.mongodb.net/ecommerce', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

    const server_port = 8080;
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(cookieParser());

    app.use('/api/products', productRouter);
    app.use('/api/carts', cartRouter);

    app.use('/api/sessions', sessionRouter);
    app.use('/api/users', userRouter);
    app.use('/api/roles', roleRouter);

    app.use(errorHandler);
    
    app.listen(server_port, () => {
      console.log(`Servidor escuchando en el puerto: ${server_port}` );
    });

    

})();

