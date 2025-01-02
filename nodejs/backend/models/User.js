const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio'],
    unique: true,
    match: [/\S+@\S+\.\S+/, 'El correo electrónico no es válido'],
  },
  username: {
    type: String,
    required: [true, 'El nombre de usuario es obligatorio'],
    unique: true,
  },
  password: { type: String, required: [true, 'La contraseña es obligatoria'] },
  cedula: {
    type: String,
    required: [true, 'La cédula es obligatoria'],
    unique: true,
    match: [/^\d{2}\.\d{3}\.\d{3}$/, 'La cédula debe tener el formato XX.XXX.XXX'],
  },
  isAdmin: { type: Boolean, default: false },
  securityQuestions: [
    {
      question: { type: String, required: true },
      answer: { type: String, required: true },
    },
  ],
}, { versionKey: false });

// middleware presave para hashear contraseñas
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);  // generar un salt
    this.password = await bcrypt.hash(this.password, salt);  // hshear la contraseña
    next();
  } catch (err) {
    next(err);
  }
});

// validar contraseñas
userSchema.methods.validatePassword = async function (password) {
  return bcrypt.compare(password, this.password);  // comparar contrasena co la almacrnada
};

const User = mongoose.model('User', userSchema);

module.exports = User;
