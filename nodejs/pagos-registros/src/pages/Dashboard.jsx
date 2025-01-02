const Dashboard = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-4">Bienvenido al Dashboard</h1>
        <p className="text-center text-gray-600">Solo usuarios autenticados pueden acceder a esta página.</p>
      </div>
    </div>
  );
};

export default Dashboard;
