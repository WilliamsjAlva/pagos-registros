const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// registrar usuario
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, cedula, securityQuestions } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }, { cedula }] });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo, cédula o nombre de usuario ya están registrados' });
    }

    if (!securityQuestions || securityQuestions.length < 3) {
      return res.status(400).json({ message: 'Debes completar las 3 preguntas de seguridad' });
    }

    for (const { question, answer } of securityQuestions) {
      if (!question || !answer) {
        return res.status(400).json({ message: 'Cada pregunta de seguridad debe tener una respuesta válida' });
      }
    }

    // hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      cedula,
      securityQuestions,
    });

    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Ocurrió un error en el servidor' });
  }
};

// iniciar sesion
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // validarcontraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// cambiar contraseña
const changePassword = async (req, res) => {
  try {
    const { username, newPassword } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Contraseña cambiada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getSecurityQuestion: async (req, res) => {
    try {
      const { username, email, cedula } = req.body;

      const user = await User.findOne({ username, email, cedula });
      if (!user) {
        return res.status(400).json({ message: 'Usuario no encontrado' });
      }

      // preguntas de recuperacion de contraseña
      const randomIndex = Math.floor(Math.random() * user.securityQuestions.length);
      const question = user.securityQuestions[randomIndex].question.replace(/[aeiouáéíóú]/gi, '*');

      res.status(200).json({ question, questionIndex: randomIndex });
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
  verifySecurityAnswer: async (req, res) => {
    try {
      const { username, questionIndex, answer } = req.body;

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'Usuario no encontrado' });
      }

      // verificar respuesta
      if (user.securityQuestions[questionIndex].answer.toLowerCase() !== answer.toLowerCase()) {
        return res.status(400).json({ message: 'Respuesta incorrecta' });
      }

      res.status(200).json({ message: 'Respuesta correcta' });
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
  changePassword,
};
