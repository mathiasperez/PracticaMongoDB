const{response} = require('express');
const Producto = require('../models/producto.model');

const getProductos = async(req,res) => {

    const productos = await Producto.find();

    res.json({
        ok:true,
        productos
    });
} 

const crearProducto = async(req,res) => {

    const {nombre,...campos} = req.body;

    try {
        const existeProducto = await Producto.findOne({nombre});

        if(existeProducto){
            return res.status(400).json({
                ok:false,
                msg: 'El producto ya ha sido registrado'
            });
        }

        // Crear el objeto de la clase model Producto
        const producto = new Producto(req.body);

        // Guardar Producto
        await producto.save();

        res.json({
            ok: true,
            producto
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error en el servidor'
        });
    }
}

const actualizarProducto = async(req,res=response) => {
    const uid = req.params.id;

    try {
        const productoDB = await Producto.findById(uid);

        if(!productoDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe un producto con ese ID'
            });
        }

        // Antes de actualizar
        const {nombre,...campos} = req.body;
        if(productoDB.nombre !== nombre){
            const existeProducto = await Producto.findOne({nombre});
            if(existeProducto){
                return res.status(400).json({
                    ok:false,
                    msg:'Ya existe un producto con ese nombre'
                });
            }
        }

        campos.nombre = nombre;

        // Actualizar los datos del producto
        const productoActualizado = await Producto.findByIdAndUpdate(uid,campos,{new:true});

        res.json({
            ok:true,
            producto: productoActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error al actualizar los datos del producto'
        });
    }

}


const eliminarProducto = async(req,res=response) => {
    const uid = req.params.id;

    try {

        const productoDB = await Producto.findById(uid);

        if(!productoDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe un producto con ese ID'
            });
        }

        await Producto.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg:'Producto eliminado de la BD'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'No es posible eliminar el producto'
        });
    }
}


module.exports = {
    getProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}
