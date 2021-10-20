const{response} = require('express');
const Pedido = require('../models/pedido.model');

const getPedidos = async (req,res) => {
    
    const pedidos = await Pedido.find();
    
    res.json({
        ok: true,
        pedidos
    });
}

const crearPedido = async(req,res) => {
    
    const uid = req.uid;
    const pedido = new Pedido({
        idusuario: uid,
        ...req.body
    });

    try {

        const pedidoDB = await pedido.save();

        res.json({
            ok: true,
            pedido: pedidoDB
        });
       
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al registrar pedido, consulte con el administrador'
        });
    }
}

const actualizarPedido = async(req,res=response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {
        
        const pedido = await Pedido.findById(id);

        if(!pedido){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un pedido con ese id'
            });
        }

        const cambiosPedido = {
            ...req.body,
            idusuario: uid
        }

        // actualizacion de los datos del pedido
        const pedidoActualizado = await Pedido.findByIdAndUpdate(id,cambiosPedido,{new:true});

        res.json({
            ok: true,
            pedido: pedidoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el pedido'
        });
    }
}

const eliminarPedido = async(req,res=response) => {
    
    const id = req.params.id;

    try {
        const pedido = await Pedido.findById(id);

        if(!pedido){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un pedido con ese ID'
            });
        }

        await Pedido.findByIdAndDelete(id);

        res.json({
            ok:true,
            msg: 'Pedido eliminado de la BD'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar el pedido'
        });
    }
} 


module.exports = {
    getPedidos,
    crearPedido,
    actualizarPedido,
    eliminarPedido,
}