const express = require('express');
const {
  registerUser,
  loginUser,
  getSecurityQuestion,
  verifySecurityAnswer,
  changePassword
} = require('../controllers/userController');
const router = express.Router();

// Rutas de autenticación
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/security-question', getSecurityQuestion);
router.post('/verify-answer', verifySecurityAnswer);
router.post('/change-password', changePassword);

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta para verificar si el usuario es admin
router.post('/check-admin', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user._id); // Busca el usuario en la base de datos
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json({ isAdmin: user.isAdmin });
    } catch (error) {
        console.error('Error al verificar el rol:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;

/*
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/me', authMiddleware(), (req, res) => {
  const user = req.user; // El usuario está disponible gracias al middleware
  res.status(200).json({
    id: user.id,
    isAdmin: user.isAdmin,
  });
});

module.exports = router;
*/
