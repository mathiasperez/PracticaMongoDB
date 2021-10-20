// Ruta: /api/clientes

const{Router} = require('express');
const {getClientes,crearCliente,actualizarCliente,eliminarCliente} = require('../controllers/clientes.controller');
const { check } =  require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/',validarJWT,getClientes);

router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido','El apellido es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        validarCampos,
    ] ,
    crearCliente);


router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        validarCampos,   
    ] ,
    actualizarCliente);

router.delete('/:id',validarJWT,eliminarCliente);

module.exports = router;
