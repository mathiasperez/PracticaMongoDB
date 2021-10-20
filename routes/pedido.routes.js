// Ruta: /api/pedidos

const{Router} = require('express');
const {getPedidos,crearPedido,actualizarPedido,eliminarPedido} = require('../controllers/pedidos.controller');
const { check } =  require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/',validarJWT,getPedidos);

router.post('/',
    [
        check('idusuario','El ID de usuario no es válido').isMongoId(),
        check('fecha', 'La fecha es obligatoria').not().isEmpty(),
        check('ciudad','El nombre de la ciudad es obligatorio').not().isEmpty(),
        check('idcliente','El ID del cliente es obligatorio').isMongoId(),
        check('total','El total del pedido es obligatorio').not().isEmpty(),
        validarCampos,
    ] ,
    crearPedido);


router.put('/:id',
    [
        validarJWT,
        check('fecha', 'La fecha es obligatoria').not().isEmpty(),
        check('ciudad','El nombre de la ciudad es obligatorio').not().isEmpty(),
        check('total','El total del pedido es obligatorio').not().isEmpty(),
        validarCampos,   
    ] ,
    actualizarPedido);

router.delete('/:id',validarJWT,eliminarPedido);

module.exports = router;
