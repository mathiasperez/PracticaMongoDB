// Ruta: /api/categorias

const{Router} = require('express');
const{getCategorias,crearCategoria,actualizarCategoria,eliminarCategoria, obtenerCategoria} = require('../controllers/categorias.controller');
const{check} = require('express-validator');
const{validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',getCategorias);

router.get('/cliente/:idcliente/:idpedido/:idproducto',validarJWT,obtenerCategoria);

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos,
],
crearCategoria);

router.put('/:id',validarJWT,actualizarCategoria);

router.delete('/:id',validarJWT,eliminarCategoria);

module.exports = router;