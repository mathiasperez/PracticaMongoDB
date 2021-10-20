const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        // Cadena de conexion de MongoDB
        await mongoose.connect(process.env.DB_CNN);

        console.log('Conexion exitosa a la BD');
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar a la BD');
    }
}

module.exports = {
    dbConnection
}