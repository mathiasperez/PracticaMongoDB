const {Schema, model, SchemaTypes} = require('mongoose');

// Definicion esquema coleccion Pedido
const PedidoSchema = Schema({
    idusuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    fecha: {
        type:String,
        required:true
    },
    ciudad: {
        type:String,
        required: true,
    },
    idcliente:{
        type:Schema.Types.ObjectId,
        ref:'Cliente',
        required: true
    },
    total: {
        type:Number,
        required: true
    }
});


// Cambiando el _id por uid
PedidoSchema.method('toJSON', function(){
    const{__v,_id,password,...object} = this.toObject();
    object.uid = _id;
    return object;
});


// Exportar el modelo, Mongoose crea el Documento
module.exports = model('Pedido',PedidoSchema);