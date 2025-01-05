const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  cedula: { type: String, required: true },
  bank: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentConcept: { type: String, required: true },
  paymentProof: { type: String, required: true }, // Ruta del archivo subido
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
}, { versionKey: false });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
