const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const Payment = require('../models/Payment');

const router = express.Router();

// Configurar Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/payments/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Ruta para subir un pago
router.post('/upload', authMiddleware, upload.single('paymentProof'), async (req, res) => {
  try {
    const { phoneNumber, cedula, bank, amount, paymentConcept } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'La imagen del comprobante de pago es obligatoria.' });
    }

    const newPayment = new Payment({
      phoneNumber,
      cedula,
      bank,
      amount,
      paymentConcept,
      paymentProof: req.file.path, // Ruta del archivo
      userId: req.user._id,
    });

    await newPayment.save();
    res.status(201).json({ message: 'Pago enviado exitosamente', payment: newPayment });
  } catch (error) {
    res.status(500).json({ error: 'Error al enviar el pago', details: error.message });
  }
});

// Ruta para obtener los pagos (solo para administradores)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const payments = await Payment.find().populate('userId', 'username email');
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los pagos', details: error.message });
  }
});

module.exports = router;
