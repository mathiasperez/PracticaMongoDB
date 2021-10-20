const {response} = require('express');
const Categoria = require('../models/categoria.model');
const Cliente = require('../models/cliente.model');
const DetallePedido = require('../models/detallepedido.model');
const Producto = require('../models/producto.model');
const Pedido = require('../models/pedido.model');

const getCategorias = async(req,res) => {

    const categorias = await Categoria.find();

    res.json({
        ok:true,
        categorias
    });
} 

const crearCategoria = async(req,res) => {

    const {nombre,...campos} = req.body;

    try {
        const existeCategoria = await Categoria.findOne({nombre});

        if(existeCategoria){
            return res.status(400).json({
                ok:false,
                msg: 'La categoría ya ha sido registrada'
            });
        }

        // Crear el objeto de la clase model Categoría
        const categoria = new Categoria(req.body);

        // Guardar Categoria
        await categoria.save();

        res.json({
            ok: true,
            categoria
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error en el servidor'
        });
    }
}

const actualizarCategoria = async(req,res=response) => {
    const uid = req.params.id;

    try {
        const categoriaDB = await Categoria.findById(uid);

        if(!categoriaDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe una categoría con ese ID'
            });
        }

        // Antes de actualizar
        const {nombre,...campos} = req.body;
        if(categoriaDB.nombre !== nombre){
            const existeCategoria = await Categoria.findOne({nombre});
            if(existeCategoria){
                return res.status(400).json({
                    ok:false,
                    msg:'Ya existe una categoría con ese nombre'
                });
            }
        }

        campos.nombre = nombre;

        // Actualizar los datos de la categoría
        const categoriaActualizada = await Categoria.findByIdAndUpdate(uid,campos,{new:true});

        res.json({
            ok:true,
            categoria: categoriaActualizada
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error al actualizar los datos de la categoría'
        });
    }

}


const eliminarCategoria = async(req,res=response) => {
    const uid = req.params.id;

    try {

        const categoriaDB = await Categoria.findById(uid);

        if(!categoriaDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe una categoría con ese ID'
            });
        }

        await Categoria.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg:'Categoría eliminada de la BD'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'No es posible eliminar la categoría'
        });
    }
}

const obtenerCategoria = async(req,res=response) => {
    const idcliente = req.params.idcliente;
    const idpedido = req.params.idpedido;
    const idproducto = req.params.idproducto;

    try {

        const clienteDB = await Cliente.findById(idcliente);
       
        if(!clienteDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe un cliente con ese ID'
            });
        }

        const pedidoDB = await Pedido.findById(idpedido);

        if(!pedidoDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe un pedido con ese ID'
            });
        }

        const detallepedidoDB = await DetallePedido.findOne({idpedido,idproducto});

        if(!detallepedidoDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe un detalle de pedido que coincida con su búsqueda'
            });
        }

        const producto = await Producto.findById(idproducto);
        
        const categoria = await Categoria.findById(producto.categoria);

        res.json({
            ok:true,
            producto: producto.nombre,
            categoria: categoria.nombre,
            cantidad: detallepedidoDB.cantidad,
            total: detallepedidoDB.total
        }); 
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'No es posible realizar la consulta'
        });
    }

}

module.exports = {
    getCategorias,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
    obtenerCategoria
}
