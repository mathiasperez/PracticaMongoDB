const {Schema,model,SchemaTypes} = require('mongoose');

// Definicion de esquema coleccion DetallePedido
const DetallePedidoSchema = Schema({
    idusuario: {
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required: true
    },
    idpedido: {
        type:Schema.Types.ObjectId,
        ref:'Pedido',
        required: true
    },
    idproducto: {
        type:Schema.Types.ObjectId,
        ref:'Producto',
        required: true
    },
    cantidad: {
        // Cantidad de un producto en el pedido
        type: Number,
        required: true
    },
    total:{
        // El total que se paga por la cantidad de un producto
        type:Number,
        required: true
    }
});

// Cambiar el _id por uid
DetallePedidoSchema.method('toJSON', function(){
    const{__v,_id,...object} = this.toObject();
    object.uid = _id;
    return object;
});

// Exportar el modelo para que Mongoose cree el Documento
module.exports = model('DetallePedido',DetallePedidoSchema);

