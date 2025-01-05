//User.js
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

// Métodos estaticos
userSchema.statics.comparePassword = async function (Password, hashedPassword) {
  try {
    return await bcrypt.compare(Password, hashedPassword);
  } catch (error) {
    throw new Error(error);
  }
};

userSchema.statics.encryptPassword = async function (clave) {
  if (!clave) {
    throw new Error('La contraseña es requerida');
  }
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(clave, salt);
};


const User = mongoose.model('User', userSchema);

module.exports = User;