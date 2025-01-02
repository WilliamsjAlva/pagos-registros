const roleMiddleware = (role) => (req, res, next) => {
    if (req.user.isAdmin !== (role === 'admin')) {
      return res.status(403).json({ error: 'No tienes permiso para acceder a esta ruta' });
    }
    next();
  };
  
  module.exports = roleMiddleware;
  