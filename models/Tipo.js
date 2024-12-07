const { Schema, model } = require('mongoose')

const TipoSchema = Schema({
    nombre:{ type: String, require: true},
    descripcion:{type: String, require: true },
    fechaCreacion:{type: Date, require: true},
    fechaActualizacion:{type: Date, require: true}
})

module.exports = model('Tipo', TipoSchema);