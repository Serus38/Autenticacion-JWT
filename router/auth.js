const { Router } = require('express');
const Usuario = require('../models/User');
const bycript = require('bcryptjs');
const { validationResult, check } = require('express-validator');
const { generarJWT } = require('../helper/jwt')

const router = Router();

//     POST 
router.post('/', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('password', 'invalid.password').not().isEmpty(),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        //Validar email
        const usuario = await Usuario.findOne({email: req.body.email})
        if (!usuario) {
            return res.status(400).send('User not found')
        }

        //Validar contraseña
        const esIgual = bycript.compareSync(req.body.password, usuario.password);
        if (!esIgual) {
            return res.status(400).json({mensaje: 'User not found'});
        }

        //Generar token
        const token = generarJWT(usuario);

        res.json({
            _id: usuario._id, nombre: usuario.nombre,
            rol: usuario.rol, email: usuario.email, access_token: token
        })




    } catch(error) {Director
        console.log(error);
        res.status(500).send('Ocurrió un error al crear director')
        
    }
    
  });

  module.exports = router;