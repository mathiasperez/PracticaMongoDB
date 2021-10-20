const {Schema,model,SchemaTypes} = require('mongoose');

// Definicion esquema coleccion Categorías
const CategoriaSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    descripcion:{
        type:String
    },
    img:{
        type: String
    }
});

// Cambiando el _id por uid
CategoriaSchema.method('toJSON', function(){
    const{__v,_id,...object} = this.toObject();
    object.uid = _id;
    return object;
});

// Exportar el modelo para que Mongoose cree el Documento
module.exports = model('Categoria',CategoriaSchema);