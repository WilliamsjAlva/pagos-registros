const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    // Obtén el token del header de autorización
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'No se proporcionó un token de autenticación' });
    }

    // Verifica y decodifica el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Busca el usuario en la base de datos usando el userId decodificado
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Agrega los datos del usuario al objeto `req` para uso posterior
    req.user = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.isAdmin ? 'admin' : 'user', // Determina si es admin o usuario normal
    };

    // Llama al siguiente middleware o controlador
    next();
  } catch (error) {
    // Manejo de errores específicos de JWT
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Token inválido' });
    } else if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Token expirado' });
    }

    // Si ocurre otro error, registra el problema y responde con un error genérico
    console.error('Error en authMiddleware:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = authMiddleware;
