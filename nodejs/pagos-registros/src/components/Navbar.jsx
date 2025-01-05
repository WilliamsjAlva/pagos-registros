import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        isLoggedIn: false,
        isAdmin: false,
    });

    // Actualizar el estado según el token y rol del usuario
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('userRole');
        if (token) {
            setUser({
                isLoggedIn: true,
                isAdmin: userRole === 'admin',
            });
        } else {
            setUser({
                isLoggedIn: false,
                isAdmin: false,
            });
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear(); // Elimina todos los datos guardados
        setUser({ isLoggedIn: false, isAdmin: false });
        navigate('/login');
    };

    return (
        <nav className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">
                    MiAplicación
                </Link>
                <ul className="flex space-x-4">
                    {!user.isLoggedIn ? (
                        <>
                            <li>
                                <Link to="/login" className="hover:underline">
                                    Iniciar Sesión
                                </Link>
                            </li>
                            <li>
                                <Link to="/register" className="hover:underline">
                                    Registrarse
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/dashboard" className="hover:underline">
                                    Dashboard
                                </Link>
                            </li>
                            {user.isAdmin && (
                                <li>
                                    <Link to="/admin" className="hover:underline">
                                        Panel de Administrador
                                    </Link>
                                </li>
                            )}
                            <li>
                                <button onClick={handleLogout} className="hover:underline">
                                    Cerrar Sesión
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
