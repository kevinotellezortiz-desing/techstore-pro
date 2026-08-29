const express        = require('express');
const Orden          = require('../models/Orden');
const verificarToken = require('../middleware/auth');
const router         = express.Router();

// POST /api/ordenes — crear orden (cliente autenticado)
router.post('/', verificarToken, async (req, res) => {
  try {
    const orden = await Orden.create({
      usuario:   req.usuario.id,   // viene del token — no se puede falsificar
      productos: req.body.productos,
      total:     req.body.total
    });
    res.status(201).json(orden);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/ordenes — ver mis órdenes (solo las del usuario del token)
router.get('/', verificarToken, async (req, res) => {
  try {
    const ordenes = await Orden.find({ usuario: req.usuario.id })
      .populate('usuario', 'nombre email')
      .populate('productos.producto', 'nombre precio icono');
    res.json(ordenes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;