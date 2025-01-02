const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// ruta pública
router.get('/home', (req, res) => {
  res.json({ message: 'Esta es una página pública accesible a todos.' });
});

// ruta para autenticados
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: `Bienvenido, ${req.user.username}. Este es tu perfil.` });
});

// ruta administradores
router.get('/admin-panel', authMiddleware, roleMiddleware('admin'), (req, res) => {
  res.json({ message: 'Bienvenido al panel de administración.' });
});

module.exports = router;
