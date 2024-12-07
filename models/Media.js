const { Schema, model } = require('mongoose')

const MediaSchema = Schema({
    serial:{ type: String, require: true, unique: true},
    titulo:{ type: String, require: true},
    descripcion:{type: String, require: true },
    foto: { type: String, required: true },
    estado:{ type: String, require: true, enum: ['Activo', 'Inactivo']},
    fechaCreacion:{type: Date, require: true},
    fechaActualizacion:{type: Date, require: true},
    añoEstreno: { type: String, required: true },
    generoPrincipal:{type: Schema.Types.ObjectId, ref:'Genero', required: true},
    directorPrincipal:{type: Schema.Types.ObjectId, ref:'Director', required: true},
     productora:{type: Schema.Types.ObjectId, ref:'Productora', required: true},
     tipo:{type: Schema.Types.ObjectId, ref:'Tipo', required: true}
    
})

module.exports = model('Media', MediaSchema);