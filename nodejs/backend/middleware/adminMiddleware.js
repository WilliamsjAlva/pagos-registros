const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = req.user; // Este usuario ya es autenticado por el middleware
        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin, // Devuelve el rol
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los datos del usuario' });
    }
});

module.exports = router;
