const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const router = express.Router();
const token = localStorage.getItem('token');
if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('Payload del token:', payload);
} else {
    console.warn('No se encontró token en localStorage.');
}


// Ruta protegida: Actualizar perfil del usuario
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const { firstName, lastName, username, email, password, cedula } = req.body;

    // Verificar si ciertos datos están en uso
    const existingUser = await User.findOne({
      $and: [
        { _id: { $ne: userId } }, // Excluir usuario actual
        {
          $or: [{ email }, { username }, { cedula }]
        }
      ]
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'El correo, cédula o nombre de usuario ya están registrados por otro usuario'
      });
    }

    // Actualizar campos permitidos
    const updates = {};
    if (firstName) updates.firstName = firstName;
    if (lastName) updates.lastName = lastName;
    if (username) updates.username = username;
    if (email) updates.email = email;
    if (cedula) updates.cedula = cedula;
    if (password) updates.password = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

    res.status(200).json({ message: 'Perfil actualizado exitosamente', user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta protegida para administradores
router.get('/admin', authMiddleware, roleMiddleware('admin'), (req, res) => {
  res.status(200).json({ message: 'Ruta de administración accesible solo para administradores' });
});

module.exports = router;
