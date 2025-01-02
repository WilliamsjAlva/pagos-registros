const AdminPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-4">Panel de Administración</h1>
        <p className="text-center text-gray-600">Solo los usuarios con rol de administrador pueden acceder aquí.</p>
      </div>
    </div>
  );
};

export default AdminPage;
