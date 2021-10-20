const {Schema,model,SchemaTypes} = require('mongoose');

// Definición esquema colección Sucursales
const SucursalSchema = Schema({
    direccion:{
        type:String,
        required:true
    },
    ciudad:{
        type:String,
        required:true
    },
    region:{
        type:String,
        required:true
    }
},{collection: 'sucursales'});

// Cambiando el _id por uid
SucursalSchema.method('toJSON', function(){
    const{__v,_id,...object} = this.toObject();
    object.uid = _id;
    return object;
});

// Exportar el modelo para que Mongoose cree el Documento
module.exports = model('Sucursal',SucursalSchema);