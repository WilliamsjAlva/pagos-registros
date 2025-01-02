import React, { useState } from 'react';

const ResetPasswordPage = () => {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleResetPassword = (e) => {
    e.preventDefault();
    console.log('Restablecer contraseña con:', { token, newPassword });
    // Lógica para validar el token y actualizar la contraseña
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Restablecer Contraseña</h1>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <input
            type="text"
            placeholder="Código recibido"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            Actualizar contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
