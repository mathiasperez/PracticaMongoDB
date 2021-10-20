const{response} = require('express');
const DetallePedido = require('../models/detallepedido.model');

const getDetallePedidos = async(req,res) => {

    const detallePedidos = await DetallePedido.find();

    res.json({
        ok:true,
        detallePedidos
    });
}

const crearDetallePedido = async(req,res) => {

    const uid = req.uid;
    const detallePedido = new DetallePedido({
        idusuario: uid,
        ...req.body
    });

    try {
        
        const detallePedidoDB = await detallePedido.save();

        res.json({
            ok:true,
            detallePedido: detallePedidoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al registrar el detalle de pedido, consulte con el administrador'
        });
    }

}

const actualizarDetallePedido = async(req,res=response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {
        
        const detallePedido = await DetallePedido.findById(id);

        if(!detallePedido){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un detalle de pedido con ese ID'
            });
        }

        const cambiosDetallePedido = {
            ...req.body,
            idusuario: uid
        }

        // Actualización de los datos del detalle de pedido
        const detallePedidoActualizado = await DetallePedido.findByIdAndUpdate(id,cambiosDetallePedido,{new:true});

        res.json({
            ok: true,
            detallePedido: detallePedidoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el detalle de pedido'
        });
    }
}

const eliminarDetallePedido = async(req,res=response) => {

    const id = req.params.id;

    try {
        
        const detallePedido = await DetallePedido.findById(id);

        if(!detallePedido){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un detalle de pedido con ese ID'
            });
        }

        await DetallePedido.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Detalle de Pedido eliminado de la BD'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar el detalle de pedido'
        });
    }
}

const busquedaDetalle = async(req,res=response) => {

    const idusuario = req.params.idusuario;
    const idpedido = req.params.idpedido;
    const idproducto = req.params.idproducto;

    try {
        


        const existeDetalle = await DetallePedido.find({idusuario,idpedido,idproducto});

        if(!existeDetalle){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un detalle de pedido que coincida con su búsqueda'
            });
        }

        res.json({
            ok:true,
            detalle: existeDetalle
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No es posible encontrar el detalle de pedido'
        });
    }
}

module.exports = {
    getDetallePedidos,
    crearDetallePedido,
    actualizarDetallePedido,
    eliminarDetallePedido,
    busquedaDetalle
}