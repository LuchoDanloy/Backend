import express from 'express';
import productRouter from './src/routes/productRouter.js'
import cartRouter from './src/routes/cartRouter.js';
//import homeRouter from './src/routes/homeRouter.js';
import mongoose from 'mongoose';

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


    //app.use('/', homeRouter);
    app.use('/api/products', productRouter);
    app.use('/api/carts', cartRouter);

})();

/* //HANDLEBARS
const viewsPath = resolve('src/views');
app.engine('handlebars',engine({
    layoutsDir: `${viewsPath}/layouts`,
    defaultLayout: `${viewsPath}/layouts/main.handlebars`
}));

app.set('view engine','handlebars');
app.set('views',viewsPath); */

/* //SOCKET
export const socketServer = new Server(httpServer);

socketServer.on('connection', socket =>{

    console.log("Nuevo Cliente Conectado")

    //recibe
    socket.on('message', (data) => {
        console.log(data);
    });


}) */