// backend/middleware/auth.js

const jwt = require('jsonwebtoken');

// Middleware que verifica el token JWT
function verificarToken(req, res, next) {
  // El token llega en el header: Authorization: Bearer <token>
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];  // extraer solo el token

  if (!token) return res.status(401).json({ error: 'Acceso denegado — token requerido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;  // poner los datos del usuario en req para usarlos después
    next();                 // continuar a la ruta protegida
  } catch (err) {
    res.status(403).json({ error: 'Token inválido o expirado' });
  }
}

module.exports = verificarToken;