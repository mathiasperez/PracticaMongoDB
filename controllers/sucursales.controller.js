const{response} = require('express');
const Sucursal = require('../models/sucursal.model');

const getSucursales = async(req,res) => {

    const sucursales = await Sucursal.find();

    res.json({
        ok:true,
        sucursales
    });
} 

const crearSucursal = async(req,res) => {

    try {

        // Crear el objeto de la clase model Sucursal
        const sucursal = new Sucursal(req.body);

        // Guardar Producto
        await sucursal.save();

        res.json({
            ok: true,
            sucursal
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error en el servidor'
        });
    }
}

const actualizarSucursal = async(req,res=response) => {
    const uid = req.params.id;

    try {
        const sucursalDB = await Sucursal.findById(uid);

        if(!sucursalDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe una sucursal con ese ID'
            });
        }

        const {...campos} = req.body;

        // Actualizar los datos del producto
        const sucursalActualizada = await Sucursal.findByIdAndUpdate(uid,campos,{new:true});

        res.json({
            ok:true,
            sucursal: sucursalActualizada
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error al actualizar los datos de la sucursal'
        });
    }
}

const eliminarSucursal = async(req,res=response) => {
    const uid = req.params.id;

    try {
        const sucursalDB = await Sucursal.findById(uid);

        if(!sucursalDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe una sucursal con ese ID'
            });
        }

        await Sucursal.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg: 'Sucursal eliminada de la DB'
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error al eliminar la sucursal'
        });
    }
}

module.exports = {
    getSucursales,
    crearSucursal,
    actualizarSucursal,
    eliminarSucursal
}