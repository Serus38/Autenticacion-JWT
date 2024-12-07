const { Router } = require('express');
const Media = require('../models/Media');
const { validationResult, check } = require('express-validator');
const { validarJWT } = require('../middleware/validar-jwt')
const { validarRolAdmin } = require('../middleware/validar-rol-admin')


const router = Router();

//GET
router.get('/',[validarJWT], async function (req, res, next) {
    
    try {

        const medias = await Media.find();
        res.send(medias);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error')
    }
    next()
    
  });

    // POST 
router.post('/',[validarJWT, validarRolAdmin], [
    check('serial', 'invalid.serial').not().isEmpty(),
    check('titulo', 'invalid.titulo').not().isEmpty(),
    check('descripcion', 'invalid.descripcion').not().isEmpty(),
    check('foto', 'invalid.foto').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
    check('fechaCreacion', 'invalidid.fechaCreacion').not().isEmpty(),
    check('fechaActualizacion', 'invalidid.fechaActualizacion').not().isEmpty(),
    check('añoEstreno', 'invalidid.añoEstreno').not().isEmpty(),
    check('generoPrincipal', 'invalidid.generoPrincipal').not().isEmpty(),
    check('directorPrincipal', 'invalidid.directorPrincipal').not().isEmpty(),
    check('productora', 'invalidid.productora').not().isEmpty(),
    check('tipo', 'invalidid.tipo').not().isEmpty(),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }


        let media = new Media();
        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.descripcion = req.body.descripcion;
        media.foto = req.body.foto;
        media.estado = req.body.estado;
        media.fechaCreacion = new Date;
        media.fechaActualizacion = new Date;
        media.añoEstreno = req.body.añoEstreno;
        media.generoPrincipal = req.body.generoPrincipal;
        media.directorPrincipal = req.body.directorPrincipal;
        media.productora = req.body.productora;
        media.tipo = req.body.tipo;

        media = await media.save(); 
        res.send(media);

    } catch(error) {Media
        console.log(error);
        res.status(500).send('Ocurrió un error al crear media')
        
    }
    
  });

 // PUT 
 router.put('/:mediaId',[validarJWT, validarRolAdmin], [
    check('serial', 'invalid.serial').not().isEmpty(),
    check('titulo', 'invalid.titulo').not().isEmpty(),
    check('descripcion', 'invalid.descripcion').not().isEmpty(),
    check('foto', 'invalid.foto').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
    check('fechaCreacion', 'invalidid.fechaCreacion').not().isEmpty(),
    check('fechaActualizacion', 'invalidid.fechaActualizacion').not().isEmpty(),
    check('añoEstreno', 'invalidid.añoEstreno').not().isEmpty(),
    check('generoPrincipal', 'invalidid.generoPrincipal').not().isEmpty(),
    check('directorPrincipal', 'invalidid.directorPrincipal').not().isEmpty(),
    check('productora', 'invalidid.productora').not().isEmpty(),
    check('tipo', 'invalidid.tipo').not().isEmpty()
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let media = await Media.findById(req.params.mediaId);
        if (!media) {
            return res.status(400).send('media no existe');
        }


        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.descripcion = req.body.descripcion;
        media.foto = req.body.foto;
        media.estado = req.body.estado;
        media.fechaActualizacion = new Date;
        media.añoEstreno = req.body.añoEstreno;
        media.generoPrincipal = req.body.generoPrincipal;
        media.directorPrincipal = req.body.directorPrincipal;
        media.productora = req.body.productora;
        media.tipo = req.body.tipo;

        media = await media.save(); 
        res.send(media);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear media')
        
    }
    
    router.get('/:mediaId', async function(req, res){
        try {
            const media = await Media.findById(req.params.mediaId);
            if(!media) {
                return res.status(404).send('Media no existe');
            }
            res.send(media);
        } catch(error) {
            console.log(error);
            res.status(500).send('Ocurrió un error al consultar media');
        }
    })
  });


  module.exports = router;