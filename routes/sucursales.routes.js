//  Ruta: /api/sucursales

const{Router} = require('express');
const{getSucursales,crearSucursal,actualizarSucursal,eliminarSucursal} = require('../controllers/sucursales.controller');
const{check} = require('express-validator');
const{validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',getSucursales);

router.post('/',[
    validarJWT,
    check('direccion','La direccion es obligatoria').not().isEmpty(),
    check('ciudad','El nombre de la ciudad es obligatorio').not().isEmpty(),
    check('region','El nombre de la región es obligatorio').not().isEmpty(),
    validarCampos,
],
crearSucursal);

router.put('/:id',validarJWT,actualizarSucursal);

router.delete('/:id',validarJWT,eliminarSucursal);

module.exports = router;
