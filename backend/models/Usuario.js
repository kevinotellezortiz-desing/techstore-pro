// backend /models/usuario.js
// 1. importar mongoose
const mongoose = require ('mongoose');

// 2. schema - define los campos del usuario 
const UsuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
});

// 3. exportar el model
const Usuario = mongoose.model('Usuario', UsuarioSchema);
module.exports = Usuario;