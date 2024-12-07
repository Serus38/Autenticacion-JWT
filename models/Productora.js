const { Schema, model } = require('mongoose')

const ProductoraSchema = Schema({
    nombre:{ type: String, require: true},
    estado:{ type: String, require: true, enum: ['Activo', 'Inactivo']},
    fechaCreacion:{type: Date, require: true},
    fechaActualizacion:{type: Date, require: true},
    slogan:{type: String, require: true},
    descripcion:{type: String, require: true }
})

module.exports = model('Productora', ProductoraSchema);