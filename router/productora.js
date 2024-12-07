const { Router } = require('express');
const Productora = require('../models/Productora');
const { validationResult, check } = require('express-validator');
const { validarJWT } = require('../middleware/validar-jwt')
const { validarRolAdmin } = require('../middleware/validar-rol-admin')


const router = Router();

router.get('/',[validarJWT], async function (req, res, next) {
    
    try {

        const productoras = await Productora.find();
        res.send(productoras);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error')
    }
    next()
    
  });

    // POST 
router.post('/',[validarJWT, validarRolAdmin], [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
    check('slogan', 'invalid.slogan').not().isEmpty(),
    check('descripcion', 'invalid.descripcion').not().isEmpty(),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }


        let productora = new Productora();
        productora.nombre = req.body.nombre;
        productora.estado = req.body.estado;
        productora.fechaCreacion = new Date;
        productora.fechaActualizacion = new Date;
        productora.slogan = req.body.slogan;
        productora.descripcion = req.body.descripcion;

        productora = await productora.save(); 
        res.send(productora);

    } catch(error) {Productora
        console.log(error);
        res.status(500).send('Ocurrió un error al crear productora')
        
    }
    
  });

 // PUT 
 router.put('/:productoraId',[validarJWT, validarRolAdmin], [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
    check('slogan', 'invalid.slogan').not().isEmpty(),
    check('descripcion', 'invalid.descripcion').not().isEmpty(),

], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let productora = await Productora.findById(req.params.productoraId);
        if (!productora) {
            return res.status(400).send('productora no existe');
        }


        productora.nombre = req.body.nombre;
        productora.estado = req.body.estado;
        productora.fechaActualizacion = new Date;
        productora.slogan = req.body.slogan;
        productora.descripcion = req.body.descripcion;


        productora = await productora.save(); 
        res.send(productora);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al actualizar productora')
        
    }
    
  });


  module.exports = router;