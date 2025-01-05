import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado para la carga
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Mostrar indicador de carga
    setError(''); // Limpiar errores previos

    try {
      // Enviar los datos al endpoint de login del backend
      const response = await API.post('/auth/login', formData);

      // Verificar si hay token en la respuesta
      if (response.data && response.data.token) {
        // Guardar el token recibido en localStorage
        localStorage.setItem('token', response.data.token);

        console.log('Token recibido:', response.data.token);

        // Redirigir al usuario al dashboard u otra página tras el inicio de sesión
        navigate('/dashboard'); // Cambiar según la ruta deseada
      } else {
        setError('Error al iniciar sesión: Token no recibido.');
      }
    } catch (error) {
      // Manejar errores (por ejemplo, credenciales incorrectas o problemas del servidor)
      setError(
        error.response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.'
      );
    } finally {
      setLoading(false); // Ocultar indicador de carga
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Inicio de Sesión</h1>

        {/* Mostrar mensajes de error si existen */}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo para el nombre de usuario */}
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            value={formData.username}
            onChange={handleChange}
            required
          />

          {/* Campo para la contraseña */}
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* Botón de envío */}
          <button
            type="submit"
            className={`w-full py-2 font-semibold rounded-md text-white ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
            }`}
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
