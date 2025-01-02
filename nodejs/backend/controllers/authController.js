const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Registrar un nuevo usuario
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, cedula, securityQuestions } = req.body;

    // Verificar si el correo, cédula o nombre de usuario ya existen
    const existingUser = await User.findOne({ $or: [{ email }, { username }, { cedula }] });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo, cédula o nombre de usuario ya están registrados' });
    }

    // Validar preguntas de seguridad
    if (!securityQuestions || securityQuestions.length < 3) {
      return res.status(400).json({ message: 'Debes completar las 3 preguntas de seguridad' });
    }
    for (const { question, answer } of securityQuestions) {
      if (!question || !answer) {
        return res.status(400).json({ message: 'Cada pregunta de seguridad debe tener una respuesta válida' });
      }
    }

    // Crear un nuevo usuario
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password,
      cedula,
      securityQuestions,
    });

    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

// Iniciar sesión de usuario
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Buscar al usuario por nombre de usuario
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Validar la contraseña usando el método `validatePassword`
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { userId: user._id, role: user.isAdmin ? 'admin' : 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

// Restablecer la contraseña
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(400).json({ message: 'Token inválido o expirado' });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Hashear la nueva contraseña (el middleware se encargará de hacerlo automáticamente)
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Contraseña restablecida con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

module.exports = { registerUser, loginUser, resetPassword };
