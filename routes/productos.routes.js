// Ruta: /api/productos

const{Router} = require('express');
const{getProductos,crearProducto,actualizarProducto,eliminarProducto} = require('../controllers/productos.controller');
const{check} = require('express-validator');
const{validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',getProductos);

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('unitario','El precio unitario es obligatorio').not().isEmpty(),
    check('stock','El stock es obligatorio').not().isEmpty(),
    validarCampos,
],
crearProducto);

router.put('/:id',validarJWT,actualizarProducto);

router.delete('/:id',validarJWT,eliminarProducto);

module.exports = router;