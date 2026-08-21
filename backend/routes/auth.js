// backend /routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const router = express.Router();


// 2. post/ api/auth/registro - crear cuenta nueva
router.post('/registro', async (req, res) => { 
    try {
        const { nombre, email, password } = req.body;

        // verificar si el usuario no existe ya 
        const existe = await Usuario.findOne({ email});
        if (existe) return res.status(400).json({error: 'El email ya esta registrado'})

        // encriptar la contraseña antes  de guardar
        const hash = await bcrypt. hash(password, 10);  //10 = nivel de incriptacion 

        // crear el usuario con la contraseña 
        const usuario = await Usuario.create({nombre, email, password: hash })

    res.status(201).json({ mensaje: 'Usuario creado correctamente', id: usuario._id });} catch (err) {
    res.status(400).json({ error: err.message });
}
});

// 3. post/ api/auth/login - iniciar sesion 
recibir token
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar el usuario por email
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(401).json({ error: 'Email o contraseña incorrectos' });

    // Comparar la contraseña con el hash guardado
    const valida = await bcrypt.compare(password, usuario.password);
    if (!valida) return res.status(401).json({ error: 'Email o contraseña incorrectos' });

    // Crear el token JWT — expira en 24 horas
    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },  
      process.env.JWT_SECRET,                      // clave secreta del .env
      { expiresIn: '24h' }                         // duración
    );

    res.json({ token, nombre: usuario.nombre });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Exportar el router
module.exports = router;