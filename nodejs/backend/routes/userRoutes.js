const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// ruta protegida para obtener datos del usuario
router.put('/profile', authMiddleware(), async (req, res) => {
    try {
      const userId = req.user._id;
      const { firstName, lastName, username, email, password, cedula } = req.body;
  
      // verificar si ciertos datos estan en uso
      const existingUser = await User.findOne({
        $and: [
          { _id: { $ne: userId } }, // excluir usuario actual
          {
            $or: [
              { email },
              { username },
              { cedula }
            ]
          }
        ]
      });
  
      if (existingUser) {
        return res.status(400).json({
          message: 'El correo, cédula o nombre de usuario ya están registrados por otro usuario'
        });
      }
  
      // actualizar campos permitidos
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
  

// ruta para admins
router.get('/admin', authMiddleware('admin'), (req, res) => {
  res.status(200).json({ message: 'Ruta de administración accesible solo para administradores' });
});

module.exports = router;
