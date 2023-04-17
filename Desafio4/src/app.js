import express from 'express';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import homeRouter from './routes/homeRouter.js';
import {engine} from 'express-handlebars';
import {resolve} from 'path';
import { Server } from 'socket.io';


const server_port = 8080;
const app = express();
const httpServer = app.listen(server_port, () => {
    console.log(`Servidor escuchando en el puerto: ${server_port}` );
});


app.use(express.json());
app.use(express.urlencoded({extended:true}));

const viewsPath = resolve('src/views');

app.engine('handlebars',engine({
    layoutsDir: `${viewsPath}/layouts`,
    defaultLayout: `${viewsPath}/layouts/main.handlebars`
}));

app.set('view engine','handlebars');
app.set('views',viewsPath);

app.use('/', homeRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);


//SOCKET
export const socketServer = new Server(httpServer);

socketServer.on('connection', socket =>{

    console.log("Nuevo Cliente Conectado")

    //recibe
    socket.on('message', (data) => {
        console.log(data);
    });


})