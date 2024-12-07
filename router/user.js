const { Router } = require('express');
const Usuario = require('../models/User');
const bycript = require('bcryptjs');
const { validationResult, check } = require('express-validator');
const { validarJWT } = require('../middleware/validar-jwt')

const router = Router();

//GET
router.get('/',[validarJWT], async function (req, res, next) {

try {
        const usuarios = await Usuario.find();
        res.send(usuarios);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error')
    }
    next()
    
  });

//     POST 
router.post('/',[validarJWT], [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('email', 'invalid.email').isEmail(),
    check('password', 'invalid.password').not().isEmpty(),
    check('rol', 'invalid.rol').isIn(['Administrador', 'Docente']),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }


        let usuario = new Usuario();
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;

        const salt = bycript.genSaltSync();
        const password = bycript.hashSync(req.body.password, salt);
        usuario.password = password;

        usuario.rol = req.body.rol;
        usuario.fechaCreacion = new Date;
        usuario.fechaActualizacion = new Date;

        usuario = await usuario.save(); 
        res.send(usuario);

    } catch(error) {Usuario
        console.log(error);
        res.status(500).send('Ocurrió un error al crear usuario')
        
    }
    
  });

//  PUT 
 router.put('/:usuarioId',[validarJWT], [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('email', 'invalid.email').isEmail(),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let usuario = await Usuario.findById(req.params.usuarioId);
        if (!usuario) {
            return res.status(400).send('Usuario no existe');
        }


        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.fechaActualizacion = new Date;

        usuario = await usuario.save(); 
        res.send(usuario);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al actualizar usuario')
        
    }
    
  });


  module.exports = router;