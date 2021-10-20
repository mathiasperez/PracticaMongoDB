const{response} = require('express');
const Cliente = require('../models/cliente.model');

const getClientes = async (req,res) => {
    
    const clientes = await Cliente.find({}, 'nombre apellido email');
    
    res.json({
        ok: true,
        clientes
    });
}

const crearCliente = async(req,res) => {
    
    const {email,nombre,apellido} = req.body;

    try {

        const existeEmail = await Cliente.findOne({email});

        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El email ya ha sido registrado por otro cliente'
            });
        }

        // Crear un objeto de clase model Cliente
        const cliente = new Cliente(req.body);
        
        // Guardar usuario en Mongoose
        await cliente.save();

        res.json({
            ok:true,
            cliente
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error en el servidor, revisar logs'
        });
    }
}

const actualizarCliente = async(req,res=response) => {

    const uid = req.params.id;

    try {
        const clienteDB = await Cliente.findById(uid);

        if(!clienteDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un cliente con ese id'
            });
        }

        // Antes de la actualizacion
        const {email,...campos} = req.body;
        if(clienteDB.email !== email){
            const existeEmail = await Cliente.findOne({email});
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un cliente con este email'
                });
            }
        }

        campos.email = email;

        // actualizacion de los datos del cliente
        const clienteActualizado = await Cliente.findByIdAndUpdate(uid,campos,{new:true});

        res.json({
            ok: true,
            cliente: clienteActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar cliente'
        });
    }
}

const eliminarCliente = async(req,res=response) => {
    const uid = req.params.id;

    try {
        const clienteDB = await Cliente.findById(uid);
        if(!clienteDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un cliente con ese ID'
            });
        }

        await Cliente.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg: 'Cliente eliminado de la bd'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar el cliente'
        });
    }
} 


module.exports = {
    getClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente,
}