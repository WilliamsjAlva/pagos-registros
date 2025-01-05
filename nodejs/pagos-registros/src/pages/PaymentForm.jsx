import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
    const [formData, setFormData] = useState({
        phoneNumber: '',
        cedula: '',
        bank: '',
        amount: '',
        paymentConcept: '',
        paymentProof: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, paymentProof: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        for (const key in formData) {
            form.append(key, formData[key]);
        }

        try {
            const response = await axios.post('http://localhost:5000/api/payments/upload', form, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            alert('Pago enviado exitosamente');
        } catch (error) {
            alert('Error al enviar el pago');
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h1 className="text-xl font-bold mb-4">Formulario de Pago</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Número de Teléfono (+58)"
                    className="w-full p-2 border rounded"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="cedula"
                    placeholder="Cédula de Identidad"
                    className="w-full p-2 border rounded"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="bank"
                    placeholder="Banco"
                    className="w-full p-2 border rounded"
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="amount"
                    placeholder="Monto"
                    className="w-full p-2 border rounded"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="paymentConcept"
                    placeholder="Concepto del Pago"
                    className="w-full p-2 border rounded"
                    onChange={handleChange}
                    required
                />
                <input
                    type="file"
                    name="paymentProof"
                    className="w-full p-2 border rounded"
                    onChange={handleFileChange}
                    required
                />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Enviar Pago
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;
