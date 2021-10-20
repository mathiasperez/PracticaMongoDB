// Ruta: /api/detallepedidos

const {Router} = require('express');
const {getDetallePedidos,crearDetallePedido,actualizarDetallePedido,eliminarDetallePedido,busquedaDetalle} = require('../controllers/detallepedidos.controller');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',validarJWT,getDetallePedidos);

router.post('/',[
    validarJWT,
    check('idusuario','El ID de usuario no es válido').isMongoId(),
    check('idpedido','El ID de pedido no es válido').isMongoId(),
    check('idproducto','El ID de producto no es válido').isMongoId(),
    check('cantidad', 'La cantidad del producto es obligatoria').not().isEmpty(),
    check('total', 'El total por el producto es obligatorio').not().isEmpty(),
    validarCampos
],
crearDetallePedido);

router.put('/:id',[
    validarJWT,
    check('cantidad', 'La cantidad del producto es obligatoria').not().isEmpty(),
    validarCampos
],
actualizarDetallePedido);


router.get('/:idusuario/pedidos/:idpedido/:idproducto',[
    validarJWT,
    check('idusuario','El ID de usuario no es válido').isMongoId(),
    check('idpedido','El ID de cliente no es válido').isMongoId(),
    check('idproducto','El ID de pedido no es válido').isMongoId(),
    validarCampos
],
busquedaDetalle);

module.exports = router;
