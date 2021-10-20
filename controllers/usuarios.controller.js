const{response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.model');


const getUsuarios = async (req,res) => {
    
    const usuarios = await Usuario.find({}, 'nombre apellido email');
    
    res.json({
        ok: true,
        usuarios
    });
}

const crearUsuario = async(req,res) => {
    
    const {email,password,nombre,apellido} = req.body;

    try {

        const existeEmail = await Usuario.findOne({email});

        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El email ya ha sido registrado'
            });
        }

        // Crear un objeto de clase model Usuario
        const usuario = new Usuario(req.body);

        // Encriptar contrasena
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);
        
        // Guardar usuario en Mongoose
        await usuario.save();

        res.json({
            ok:true,
            usuario
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error en el servidor, revisar logs'
        });
    }
}

const actualizarUsuario = async(req,res=response) => {
    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        // Antes de la actualizacion
        const {password,email,...campos} = req.body;
        if(usuarioDB.email !== email){
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con este email'
                });
            }
        }

        campos.email = email;

        // actualizacion de los datos del usuario
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos,{new:true});

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar usuario'
        });
    }
}

const eliminarUsuario = async(req,res=response) => {
    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese ID'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg: 'Usuario eliminado de la bd'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar usuario'
        });
    }
} 


module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}