import { Navigate } from 'react-router-dom';

// Verifica si el usuario está autenticado (hay un token en localStorage)
const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token; // Devuelve true si hay un token, false si no
};

// Verifica si el usuario es admin decodificando el token
const isAdmin = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        // Decodifica el payload del token
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.role === 'admin'; // Devuelve true si el rol es admin
    } catch (error) {
        console.error('Error al decodificar el token:', error);
        return false; // Si hay algún error, no es admin
    }
};

// Componente PrivateRoute para proteger rutas
const PrivateRoute = ({ children, adminOnly = false }) => {
    // Verifica si el usuario está autenticado
    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }

    // Si la ruta es solo para administradores y el usuario no es admin
    if (adminOnly && !isAdmin()) {
        console.warn('Usuario no autorizado para esta ruta'); // Mensaje de depuración
        return <Navigate to="/dashboard" />; // Redirige al dashboard normal
    }

    // Si pasa todas las verificaciones, renderiza el contenido protegido
    return children;
};

export default PrivateRoute;
/*

import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token; // Devuelve true si hay un token, false si no
};

const isAdmin = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el payload del token
        if (payload.role !== 'admin') {
            console.warn('Rol del usuario no es admin:', payload.role);
        }
        return payload.role === 'admin';
    } catch (error) {
        console.error('Error al decodificar el token:', error);
        return false;
    }
};


const PrivateRoute = ({ children, adminOnly = false }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }

    if (adminOnly && !isAdmin()) {
        console.warn('Usuario no autorizado para esta ruta'); // Agrega esto para depurar
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default PrivateRoute; */