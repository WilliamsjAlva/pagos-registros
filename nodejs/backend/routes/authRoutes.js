const express = require('express');
const {
  registerUser,
  loginUser,
  getSecurityQuestion,
  verifySecurityAnswer,
  changePassword,
} = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/security-question', getSecurityQuestion);
router.post('/verify-answer', verifySecurityAnswer);
router.post('/change-password', changePassword);

module.exports = router;
