const {Schema, model, SchemaTypes} = require('mongoose');

// Definicion esquema coleccion Usuario
const UsuarioSchema = Schema({
    nombre:{
        type:String,
        required:true
    },
    apellido: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required:true
    }
});


// Cambiando el _id por uid
UsuarioSchema.method('toJSON', function(){
    // Ya no se devuelve el password
    const{__v,_id,password,...object} = this.toObject();
    object.uid = _id;
    return object;
})


// Exportar el modelo, Mongoose crea el Documento
module.exports = model('Usuario',UsuarioSchema);