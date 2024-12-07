const { Schema, model } = require('mongoose')

const DirectorSchema = Schema({
    nombre:{ type: String, require: true},
    estado:{ type: String, require: true, enum: ['Activo', 'Inactivo']},
    fechaCreacion:{type: Date, require: true},
    fechaActualizacion:{type: Date, require: true}
})

module.exports = model('Director', DirectorSchema);