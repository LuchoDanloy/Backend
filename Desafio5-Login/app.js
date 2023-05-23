import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import cookieParser from "cookie-parser";

import productRouter from './src/routes/productRouter.js'
import cartRouter from './src/routes/cartRouter.js';
import sessionRouter from './src/routes/sessionRouter.js';

void (async() =>
{

    //CONEXION CON MONGO-ATLAS
    await mongoose.connect('mongodb+srv://lucianodanloy:admin123@cluster0.brl6jiv.mongodb.net/ecommerce', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

    const server_port = 8080;
    const app = express();
    const httpServer = app.listen(server_port, () => {
        console.log(`Servidor escuchando en el puerto: ${server_port}` );
    });


    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(cookieParser());
    app.use(session({
        store: mongoStore.create({
          mongoUrl: 'mongodb+srv://lucianodanloy:admin123@cluster0.brl6jiv.mongodb.net/ecommerce',
          ttl: 15
        }),
        secret: 'CoderS3cR3tC0D3',
        resave: false,
        saveUninitialized: false
      }));


    app.use('/api/sessions', sessionRouter);
    app.use('/api/products', productRouter);
    app.use('/api/carts', cartRouter);

})();

