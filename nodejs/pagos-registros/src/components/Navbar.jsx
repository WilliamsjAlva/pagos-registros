import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const isAuthenticated = () => {
        return localStorage.getItem('authToken') !== null;
    };

    const isAdmin = () => {
        return localStorage.getItem('userRole') === 'admin';
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        navigate('/login');
    };

    return (
        <nav className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">
                    MiAplicación
                </Link>
                <ul className="flex space-x-4">
                    {!isAuthenticated() && (
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
                    )}

                    {isAuthenticated() && (
                        <>
                            <li>
                                <Link to="/dashboard" className="hover:underline">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="hover:underline">
                                    Cerrar Sesión
                                </button>
                            </li>
                        </>
                    )}

                    {isAdmin() && (
                        <li>
                            <Link to="/admin" className="hover:underline">
                                Panel de Administrador
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
