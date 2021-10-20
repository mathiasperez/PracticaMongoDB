const {Schema,model,SchemaTypes} = require('mongoose');

// Definicion esquema coleccion Productos
const ProductoSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    unitario:{
        type:Number,
        required: true
    },
    stock:{
        type:Number,
        required:true
    },
    categoria:{
        type:Schema.Types.ObjectId,
        ref: 'Categoria',
    },
    descripcion:{
        type:String
    },
    img:{
        type: String
    }
});

// Cambiando el _id por uid
ProductoSchema.method('toJSON', function(){
    const{__v,_id,...object} = this.toObject();
    object.uid = _id;
    return object;
});

// Exportar el modelo para que Mongoose cree el Documento
module.exports = model('Producto',ProductoSchema);