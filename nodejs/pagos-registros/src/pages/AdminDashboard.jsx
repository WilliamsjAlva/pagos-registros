import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/payments', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setPayments(response.data);
            } catch (error) {
                console.error('Error al obtener pagos:', error);
            }
        };

        fetchPayments();
    }, []);

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h1 className="text-xl font-bold mb-4">Dashboard de Pagos</h1>
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Teléfono</th>
                        <th className="border border-gray-300 px-4 py-2">Cédula</th>
                        <th className="border border-gray-300 px-4 py-2">Banco</th>
                        <th className="border border-gray-300 px-4 py-2">Monto</th>
                        <th className="border border-gray-300 px-4 py-2">Concepto</th>
                        <th className="border border-gray-300 px-4 py-2">Comprobante</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment._id}>
                            <td className="border border-gray-300 px-4 py-2">{payment.phoneNumber}</td>
                            <td className="border border-gray-300 px-4 py-2">{payment.cedula}</td>
                            <td className="border border-gray-300 px-4 py-2">{payment.bank}</td>
                            <td className="border border-gray-300 px-4 py-2">{payment.amount}</td>
                            <td className="border border-gray-300 px-4 py-2">{payment.paymentConcept}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <a
                                    href={`http://localhost:5000/${payment.paymentProof}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline"
                                >
                                    Ver Comprobante
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
