import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  // comprueba si hay un token de autenticacion almacenado
  return localStorage.getItem('authToken') !== null;
};

const isAdmin = () => {
  // verifica si el usuario tiene rol de administrador
  return localStorage.getItem('userRole') === 'admin';
};

const PrivateRoute = ({ children, adminOnly = false }) => {
  // redirigir al login si no está autenticado
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  // redirigir al dashboard si no es administrador pero se requiere acceso de admin
  if (adminOnly && !isAdmin()) {
    return <Navigate to="/dashboard" />;
  }

  // si esta todo bien renderiza
  return children;
};

export default PrivateRoute;
