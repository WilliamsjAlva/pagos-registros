const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (userRole === requiredRole) {
      return next();
    }

    return res.status(403).json({ message: 'Acceso denegado: No tienes los permisos necesarios' });
  };
};

module.exports = roleMiddleware;
