// Importar en node
const express = require('express');
require('dotenv').config();
const {dbConnection} = require('./config/database');
const cors = require('cors');


// Creando servidor Express
const app = express();

// Configuracion de CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Conexion a la BD
dbConnection();

// Rutas de API
app.use('/api/usuarios',require('./routes/usuarios.routes'));
app.use('/api/login',require('./routes/auth.routes'));
app.use('/api/clientes',require('./routes/clientes.routes'));
app.use('/api/pedidos',require('./routes/pedido.routes'));
app.use('/api/productos',require('./routes/productos.routes'));
app.use('/api/detallepedidos',require('./routes/detallepedido.routes'));
app.use('/api/categorias',require('./routes/categorias.routes'));
app.use('/api/sucursales',require('./routes/sucursales.routes'));

// Levantar el servidor
app.listen(process.env.PORT,()=>{
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
})